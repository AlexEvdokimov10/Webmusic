const Router=require("express")
const User=require("../models/User")
const Bcrypt=require("bcryptjs")
const Jwt=require("jsonwebtoken")
const fs = require("fs")
const UUid = require("uuid")
const {check,validationResult}=require("express-validator")
const router=new Router()
const config=require("config")
const musicService = require("../services/musicService")
const authMiddleware=require('../middleware/auth.middleware')
const Role=require("../models/Role")

router.post("/registration",[check('email',"Uncorrect email").isEmail(), check('password','Password must be longer than 3 and shorter than 12').isLength({min:6,max:12})],async (req, res)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message:"Uncorrect request",errors})
        }
        const {nickname,email, password}=req.body
        const candidate=await User.findOne({email})
        if(candidate){
            return res.status(400).json({message:`User with email ${email} already exists`})
        }
        const hashPassword=await Bcrypt.hash(password,8);
        const userRole=await Role.findOne({value:"USER"})
        const user = new User({nickname,email,password:hashPassword,roles:[userRole.value]})
        await user.save()
        await musicService.createMusicDir({author:user.id})

        return res.json({message:"User was created"})



    } catch (e){
        console.log(e)
        res.send({message:"Server error"})
    }
})
router.post("/login",async (req, res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user) {
            return res.status(404).json({message:"User doesn't exist"})
        }
        const isPassValid=Bcrypt.compareSync(password,user.password)
        if(!isPassValid){
            return res.status(400).json({message:"Invalid password"})
        }
        const token=Jwt.sign({id:user.id,roles:user.roles},config.get("secretKey"),{expiresIn:"1h"})
        return res.json({
            token,
            user:{
                id:user.id,
                nickname:user.nickname,
                email:user.email,
            }
        })
    } catch (e){
        console.log(e)
        res.send({message:"Server error"})
    }
})
router.get("/auth",authMiddleware,async (req, res)=>{
    try{
        const user = await User.findOne({_id:req.user.id})
        const token=Jwt.sign({id:user.id},config.get("secretKey"),{expiresIn:"1h"})
        return res.json({
            token,
            user:{
                id:user.id,
                nickname: user.nickname,
                email: user.email,
                roles:user.roles,
                avatar:user.avatar
            }
        })
    } catch (e){
        console.log(e)
        res.send({message:"Server error"})
    }
})

router.patch('/edit-user', authMiddleware,
    async (req, res) => {
        try {
            await User.updateOne({_id:req.user.id },req.body)
            return res.json({
                message:"User was updated"
            },)
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.post('/avatar',authMiddleware,
    async (req,res)=>{
    try {
        const file = req.files.file
        const user = await User.findById ( req.user.id )
        const avatarName = UUid.v4 () + ".jpg"
        file.mv ( config.get ( 'staticPath' ) + "\\" + avatarName )
        user.avatar = avatarName
        await user.save ()
        return res.json ( user )
    } catch ( e ) {
        console.log(e)
        return res.status(400).json({message:"Upload avatar error"})
    }
})


router.delete('/avatar',authMiddleware,
    async (req,res)=>{
        try {
            const user = await User.findById ( req.user.id )
            fs.unlinkSync ( config.get ( 'staticPath' ) + "\\" + user.avatar )
            user.avatar = null
            await user.save ()
            return res.json ( user )
        } catch ( e ) {
            console.log(e)
            return res.status(400).json({message:"Upload avatar error"})
        }
    })

module.exports=router
