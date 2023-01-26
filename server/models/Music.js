const {model,Schema,ObjectId}=require('mongoose')

const Music=new Schema({
    name:{
        type:String, required:true
    }
})