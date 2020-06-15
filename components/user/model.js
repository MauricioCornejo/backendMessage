const mongoose = require('mongoose')

const Schema = mongoose.Schema

const myShema =  new Schema({
  name: String, 
})

const model = mongoose.model('User', myShema)
module.exports = model
