const {model,Schema,ObjectId}=require('mongoose')

const Music=new Schema({
    name:{
        type:String, required:true
    },
    type:{type:String, default:" "},
    path:{type:String, default:0},
    time:{type:Number,default: 0},
    author:{type:ObjectId, ref:'User'}
})

module.exports=model("Music",Music)