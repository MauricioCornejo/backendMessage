const mongoose = require('mongoose')

const Schema = mongoose.Schema

const myShema =  new Schema({
  chat:{
    type: Schema.ObjectId, 
    ref: 'Chat',
  },

  user: {
    type: Schema.ObjectId, 
    ref: 'User',
  },
  message: {type: String, required : false},
  date:  Date,
  file:  String
})

const model = mongoose.model('Message', myShema)
module.exports = model
