const store = require('./store')
const socket = require('../../socket').socket
const config = require('../../config')

function addMessage(chat,user, message, file ){
  return new Promise((resolve, reject) => {
    if(!chat || !user || !message){
      console.error('[messageController] No hay usuario o mensaje')
      reject('Los Datos son Incorrectoos')
      return false
    }
    let fileUrl = ''
    if ( file ){
      fileUrl = config.host + ':' + config.port + config.publicRoute + '/'+ config.filesRoute + '/' + file.filename
    }
    const fullMessage = {
      chat: chat,
      user : user,
      message: message,
      date: new Date(),
      file: fileUrl
    }
    store.add(fullMessage)

    socket.io.emit('message', fullMessage)
    // console.log(fullMessage)
    resolve(fullMessage)
  })
}

function getMessages(filterUser){
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser))
  })
}

function updateMessage(id, message){
  return new Promise(async (resolve, reject)=>{
    if(!id || !message){
      reject('Invalid Data')
      return false
    }
    const result = await store.updateText(id, message)
    resolve(result)
  })
}

function deleteMessage(id){
  console.log(`[Controller Delete Message id] ${id}`)
  return new Promise(async (resolve, reject) => {
    if(!id){
      reject('Invalid Id')
      return false
    }
    await store.remove(id)
      .then(()=>{
        resolve()
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
}