
const Model = require('./model')
// conect to DATA BASE 
// //mongodb+srv://db_user_mauricio:rUtFODyFysLf74re@cluster0-vjvyo.mongodb.net/test?retryWrites=true&w=majority
// db.Promise = global.Promise
// db.connect('mongodb+srv://db_user_mauricio:rUtFODyFysLf74re@cluster0-vjvyo.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(()=>{
//     console.log('[db] Conectada con éxito')
//   }).catch(error => console.error(error))

function addMessage(message){
  const myMessage = new Model(message)
  console.log(`[myMessage] ${myMessage}`)
  myMessage.save()
}

async function getMessages(filterUser){
  return new Promise((resolve, reject) => {
    let filter = {}
    if (filterUser!== null){
      filter = { user: filterUser }
    }  
    Model.find(filter)
      .populate('user')
      .exec((error, populated) =>{
        if (error ){
          reject(error)
          return false
        }
        resolve(populated)
      })
  })

}

async function updateText(id, message){
  const foundMessage = await Model.findOne({_id: id})
  foundMessage.message = message
  const newMessage = await foundMessage.save()
  return newMessage
}

function removeMessage(id){
  console.log(`[ID REMOVE MESSAGE STORE] ${id}`)
  return  Model.deleteOne({ _id: id})
}


module.exports = {
  add :addMessage,
  list: getMessages,
  updateText: updateText,
  remove: removeMessage
}