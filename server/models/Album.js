const {Schema, model , ObjectId }=require("mongoose")

const Album=new Schema({
    name:{type:String, default:" ", required:true},
    genre:[{type:String, ref:"Genre",default:""}],
    image:{type:String,default: " "},
    author:{type:ObjectId,ref:"User"},
})

module.exports = model('album', Album)