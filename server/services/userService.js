const User = require ( "../models/User" );
const Bcrypt = require ( "bcryptjs" );
const Role = require ( "../models/Role" );
const musicService = require ( "./musicService" );
const roleService = require ( "./roleService" );
const mailService = require("./mailService")
const Jwt = require ( "jsonwebtoken" );
const config = require ( "config" );
const ApiError = require('../exceptions/api-error')
const UUid = require ( "uuid" );
const fs = require ( "fs" );
const Music = require("../models/Music");

class UserService {
    async registration( nickname , email , password ) {
        const candidate = await User.findOne ( { email } )
        if (candidate) {
            throw ApiError.BadRequest(`Email ${email} has already registered`)
        }
        const hashPassword = await Bcrypt.hash ( password , 8 );
        const userRole = await Role.findOne ( { value: "USER" } )
        const activationLink =UUid.v4()
        const user = new User ( { nickname  , password: hashPassword ,activationLink:activationLink, roles: [userRole.value] } )
        await mailService.sendActivationMail(email,`${config.get("API_URL")}/api/auth/activate/${activationLink}`)
        await user.save ()
        await musicService.createMusicDir ( { author: user.id } )
    }

    async activate(activationLink,email){
        const user =await User.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequest('Is not correct link activation')
        }
        user.email = email
        user.isActivated=true
        await user.save()
    }

    async restore(restoreLink){
        const user =await User.findOne({restoreLink: restoreLink})
        if(!user){
            throw ApiError.BadRequest('Is not correct link activation')
        }
        user.restoreDate = Date.now()
        await user.save()
    }

    async restoreUserByEmail(email){
        const user =await User.findOne({email:email})
        if(!user){
            throw ApiError.BadRequest("User with this email wasn't founded")
        }
        let restoreDate = user.restoreDate
        let restoreLink = user.restoreLink
        const now = Date.now()
        const minutes = (
            now - restoreDate) / 300000;
        if( !restoreDate || !restoreLink || minutes>5) {
            restoreLink = UUid.v4 ()
            user.restoreLink = restoreLink
            await user.save()
        }
        await mailService.sendActivationMail(email,`${config.get("API_URL")}/api/auth/restoreEmail/${restoreLink}`)

    }


    async changePassword(restoreLink,password){
        const user=await User.findOne({restoreLink:restoreLink})
        if(!user) {
            throw ApiError.BadRequest ( "Link is not actually" )
        }
        const hashPassword = await Bcrypt.hash ( password , 8 );
        user.password = hashPassword
        await user.save()
    }

    async changeEmail(restoreLink,email){
        const user=await User.findOne({restoreLink:restoreLink})
        if(!user) {
            throw ApiError.BadRequest ( "Link is not actually" )
        }
        const candidate = await User.findOne({email:email})
        if(candidate){
            throw ApiError.BadRequest ( "This email has already used" )
        }
        const activationLink =UUid.v4()
        await mailService.sendActivationMail(email,`${config.get("API_URL")}/api/auth/activate/${activationLink}?email=${email}`)
        user.activationLink = activationLink
        await user.save()
    }


    async login(email,password){
        const user=await User.findOne({email})
        if(!user) {
            throw ApiError.BadRequest('User with this email is not found')
        }
        const isPassValid=Bcrypt.compareSync(password,user.password)
        if(!isPassValid){
            throw ApiError.BadRequest('Password is not correct')
        }
        const payload = {id:user._id, roles:user.roles}
        const token=Jwt.sign(payload,config.get("secretKey"),{expiresIn:"1h"})
        return ({
            token,
            user:{
                id:user.id,
                nickname:user.nickname,
                email:user.email,
                roles:user.roles,
            }
        })
    }
    async auth(id){
        const user = await User.findById(id)
        if(!user){
            throw ApiError.UnauthorizedError()
        }
        const token=Jwt.sign({id:user._id,roles:user.roles},config.get("secretKey"),{expiresIn:"1h"})
        return ({
            token,
            user:{
                id:user._id,
                nickname: user.nickname,
                email:user.email,
                roles:user.roles,
                avatar:user.avatar
            }
        })
    }

    async editNickname( id, user){
        const userData = await User.findOneAndUpdate({_id:id} , {nickname:user.nickname} , { new: true } )
        return userData;
    }

    async editUser(id,user){
        const roles = await roleService.findRoleByValue(user.roles)
        const userData = await User.findOneAndUpdate({_id:id} , {nickname:user.nickname,email:user.email, roles:roles} , { new: true } )
        return userData;
    }

    async addAvatar(file,id){
        const user = await User.findById ( id )
        if(!user){
            throw ApiError.UnauthorizedError()
        }
        const avatarName = UUid.v4 () + ".jpg"
        file.mv ( config.get ( 'staticAvatars' ) + "\\" + avatarName )
        user.avatar = avatarName
        await user.save ()
        return user
    }
    async deleteAvatar(id){
        const user = await User.findById ( id )
        if(!user){
            throw ApiError.UnauthorizedError()
        }
        fs.unlinkSync ( config.get ( 'staticAvatars' ) + "\\" + user.avatar )
        user.avatar = null
        await user.save ()
        return user
    }

    async getUsers(page,limit){
        const users = await User.find({},{password:0})
        const total = await User.countDocuments ()
        return {
            users: users , total: total
        }
    }

    async getUser(userId){
        const user = await User.findOne({_id:userId},{password:0})
        if(user) {
            return user
        }
        return ApiError.BadRequest ( "User wasn't found" )
    }

    async findUsers(searchName){
        const users = await User.find({nickname:{$regex:searchName,$options:"i"}},{password:0})
        const total = await User.countDocuments({nickname:{$regex:searchName,$options:"i"}},{password:0})
        return {
            users:users,
            total:total
        }
    }

    async deleteUser(userId){
        const user = await User.findOne({_id:userId})
        const musics = await Music.find({author:userId})
        musics.map((music)=>{
            musicService.deleteMusic(music._id,userId)
        })
        await this.deleteUserFile(user)
        await user.remove()
        return "User was deleted"
    }

    async deleteUserFile( user ) {
        const path = config.get("musicPath")+"\\"+user._id
        fs.rmdir ( path ,()=>{
            console.log("path was deleted")
        })
        const avatar = user.avatar
        if (avatar) {
            fs.unlinkSync ( config.get ( 'staticAvatars' ) + "\\" + avatar )
        }
    }
}

module.exports = new UserService ()