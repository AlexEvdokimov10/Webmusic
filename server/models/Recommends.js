const {model,Schema,ObjectId}=require('mongoose')

const Recommends=new Schema({
    musics:[],
    user:{type:ObjectId, ref:'User'}
})

module.exports=model("Recommends", Recommends)