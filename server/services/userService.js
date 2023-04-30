const User = require ( "../models/User" );
const Bcrypt = require ( "bcryptjs" );
const Role = require ( "../models/Role" );
const musicService = require ( "./musicService" );
const Jwt = require ( "jsonwebtoken" );
const config = require ( "config" );
const ApiError = require('../exceptions/api-error')
const UUid = require ( "uuid" );
const fs = require ( "fs" );

class UserService {
    async registration( nickname , email , password ) {
        const candidate = await User.findOne ( { email } )
        if (candidate) {
            throw ApiError.BadRequest(`Email ${email} has already registered`)
        }
        const hashPassword = await Bcrypt.hash ( password , 8 );
        const userRole = await Role.findOne ( { value: "USER" } )
        const user = new User ( { nickname , email , password: hashPassword , roles: [userRole.value] } )
        await user.save ()
        await musicService.createMusicDir ( { author: user.id } )
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
        const token=Jwt.sign({id:user.id,roles:user.roles},config.get("secretKey"),{expiresIn:"1h"})
        return ({
            token,
            user:{
                id:user.id,
                nickname:user.nickname,
                email:user.email,
            }
        })
    }

    async auth(id){
        const user = await User.findById(id)
        if(!user){
            throw ApiError.UnauthorizedError()
        }
        const token=Jwt.sign({id:user.id},config.get("secretKey"),{expiresIn:"1h"})
        return ({
            token,
            user:{
                id:user.id,
                nickname: user.nickname,
                email: user.email,
                roles:user.roles,
                avatar:user.avatar
            }
        })
    }

    async edit(id,user){
        const userData = await User.findOneAndUpdate(id , user , { new: true } )
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
}

module.exports = new UserService ()