const {model,Schema,ObjectId}=require('mongoose')

const Recommends=new Schema({
    musics:[{type:ObjectId,ref:"Music"}],
    user:{type:ObjectId, ref:'User'},
    updateDate:{type:Date,default:Date.now()}
})

module.exports=model("Recommends", Recommends)