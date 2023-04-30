const { validationResult } = require ( "express-validator" );
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
            const user = await userService.edit(req.user.id ,req.body)
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
}

module.exports=new UserController()