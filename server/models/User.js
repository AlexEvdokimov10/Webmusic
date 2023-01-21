const {Schema, model}=require("mongoose")

const User=new Schema({
    nickname:{type:String,required:true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required:true},
    roles:{type:Array},
    musicAmount:{type:Number, default:0},
})
module.exports=model("User",User)