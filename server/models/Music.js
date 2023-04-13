const {model,Schema,ObjectId}=require('mongoose')

const Music=new Schema({
    name:{
        type:String, required:true
    },
    type:{type:String, default:" "},
    path:{type:String, default:0},
    time:{type:Number,default: ""},
    date:{type:Date, default:Date.now()},
    image:{type:String,default:""},
    author:{type:ObjectId, ref:'User'}
})

module.exports=model("Music",Music)