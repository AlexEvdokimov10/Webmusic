const {Schema, model}=require("mongoose")

const User=new Schema({
    nickname:{type:String,required:true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required:true},
    avatar:{ type:String },
    roles:[{type: String, ref: 'Role'}],
})
module.exports=model("User",User)