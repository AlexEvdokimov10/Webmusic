const { validationResult } = require ( "express-validator" );
const config = require ( "config" );
const userService = require("../services/userService")
const ApiError = require("../exceptions/api-error")

class UserController {

    async registration(req,res,next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error',errors.array()))
            }
            const {nickname,email, password}=req.body

            await userService.registration(nickname,email,password)

            return res.json({message:"User was created"})
        } catch (e){
            next(e)
        }

    }

    async activate(req,res,next){
        try{
            const activationLink = req.params.link
            const email = req.query.email
            await userService.activate(activationLink,email)
            return res.redirect(config.get("clientUrl")+"/activation"+"/"+activationLink)
        } catch ( e ) {
            next(e)
        }
    }

    async changePassword(req,res,next){
        try {
            const restoreLink = req.params.link
            const password = req.body.password
            await userService.changePassword ( restoreLink , password )
            return res.json ( { message: "Password was changed" } )
        } catch ( e ) {
            next(e)
        }
    }

    async changeEmail(req,res,next){
        try {
            const restoreLink = req.params.link
            const email = req.query.email
            console.log(email)
            await userService.changeEmail( restoreLink , email )
        } catch ( e ) {
            next(e)
        }
    }
    async restorePassword( req, res, next){
        try{
            const email = req.query.email
            await userService.sendLinkOnEmail(email)
            return res.json({message:"Message was sent on your email"})
        } catch ( e ) {
            next(e)
        }
    }

    async restoreByEmail(req,res,next){
        try{
            const email = req.query.email
            await userService.sendLinkOnEmail(email)
            return res.json({message:"Message was sent on your email"})
        } catch ( e ) {
            next(e)
        }
    }

    async restoreLinkPasswd( req, res, next){
        try {
            const restoreLink = req.params.link
            await userService.restore(restoreLink)
            return res.redirect(config.get("clientUrl")+"/restorePasswd"+"/"+restoreLink)
        } catch ( e ) {
            next(e)
        }
    }

    async restoreLinkEmail( req, res, next){
        try {
            const restoreLink = req.params.link
            await userService.restore(restoreLink)
            return res.redirect(config.get("clientUrl")+"/restoreEmail"+"/"+restoreLink)
        } catch ( e ) {
            next(e)
        }
    }

    async login(req,res,next){
        try{
            const {email,password}=req.body;
            const userData=await userService.login(email,password)
            return res.json(userData)
        } catch (e){
            next(e)
        }
    }

    async auth(req,res,next) {
        try{
            const userData = await userService.auth(req.user.id)
            return res.json(userData)
        } catch (e){
            next(e)
        }
    }

    async editUser(req,res,next) {
        try {
            const user = await userService.editNickname(req.user.id ,req.body)
            return res.json(user)
        } catch (e) {
           next(e)
        }
    }
    async editUserProfile(req,res,next) {
        try {
            const user = await userService.editUser(req.params.id ,req.body)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async addAvatar(req,res,next) {
        try {
            const file = req.files.file
            const user = await userService.addAvatar(file,req.user.id)
            return res.json ( user )
        } catch ( e ) {
            next(e)
        }
    }

    async deleteAvatar(req,res,next){
        try {
            const user = await userService.deleteAvatar(req.user.id)
            return res.json ( user )
        } catch ( e ) {
            next(e)
        }
    }

    async getUsers(req,res,next) {
        try {
            const limit = req.query.limit
            const page = req.query.page
            const users = await userService.getUsers(page,limit)
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async getUser(req,res,next){
        try {
            const userId = req.params.id
            const user = await userService.getUser(userId)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async findUsers(req,res,next){
        try{
            const searchName = req.query.name
            const findUsers = await userService.findUsers(searchName)
            return res.json(findUsers)
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req,res,next){
        try {
            const userId = req.params.id
            const message = await userService.deleteUser(userId)
            return res.json(message)
        } catch (e) {
            next(e)
        }
    }
}

module.exports=new UserController()