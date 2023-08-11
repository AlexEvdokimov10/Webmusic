const {model,Schema,ObjectId}=require('mongoose')

const Message = new Schema({
    text:{type:String,default:""},
    date:{type:Date, default: Date.now()},
    author:{type:ObjectId, ref:'User'},
})

module.exports=model("Message",Message)