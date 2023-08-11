const {model,Schema,ObjectId}=require('mongoose')

const Playlist=new Schema({
    name:{type:String,default: "My playlist"},
    user:{type:ObjectId, ref:'User'},
    updateDate:{type:Date,default:Date.now()}
})

module.exports=model("Playlist", Playlist)