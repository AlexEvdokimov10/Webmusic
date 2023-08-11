const {model,Schema,ObjectId}=require('mongoose')

const Music=new Schema({
    name:{
        type:String, required:true
    },
    genre:[{type:String, ref:"Genre",default:""}],
    path:{type:String, default:""},
    time:{type:Number,default:0},
    description:{type:String,default: ""},
    date:{type:Date, default:Date.now()},
    image:{type:String,default:""},
    listens:[{type:ObjectId,ref:"User"}],
    likes:[{type:ObjectId,ref:"User"}],
    author:{type:ObjectId, ref:'User'},
    playlists:[{type:ObjectId,ref:"Playlist"}],
    album:{type:ObjectId,ref:"album"}
})

module.exports=model("Music",Music)