const {Schema, model} = require('mongoose')

const Genre = new Schema({
    value: {type: String, unique: true, default: ""},
})

module.exports = model('Genre', Genre)