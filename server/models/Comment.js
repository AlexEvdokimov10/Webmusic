const {Schema, model , ObjectId }=require("mongoose")

const Comment=new Schema({
    text:{type:String,default:""},
    music:{type:ObjectId,ref:"Music"},
    author:{type:ObjectId,ref:"User"},
    authorName:{type:String,ref:"User"},
    authorAvatar:{type:String,ref:"User"}
})

module.exports = model('Comment', Comment)