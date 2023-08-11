const {Schema, model , ObjectId }=require("mongoose")

const User=new Schema({
    nickname:{type:String,required:true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required:true},
    dateRegistered:{type:Date,default:Date.now()},
    avatar:{ type:String },
    isActivated:{type:Boolean,default:false},
    activationLink:{type:String},
    restoreLink:{type:String},
    restoreDate:{type:Date},
    roles:[{type: String, ref: 'Role'}],
})
module.exports=model("User",User)