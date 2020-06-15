const mongoose = require('mongoose')

const Schema = mongoose.Schema

const myShema =  new Schema({
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
})

const model = mongoose.model('Chat', myShema)
module.exports = model
