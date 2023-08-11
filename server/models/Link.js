const {Schema, model} = require('mongoose')

const Link = new Schema({
    activationLink:{type:String},
    restoreLink:{type:String},
})
module.exports=model("Link",Link)