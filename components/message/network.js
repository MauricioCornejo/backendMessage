const express = require('express')
const multer = require('multer')

const config = require('../../config')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()
// imports from use method 

// upload files 
const upload = multer({
  dest: 'public/' +config.filesRoute +'/'
})

router.get('/', function(req, res) {
  const filterMessages = req.query.user || null
  // const filterMessages = req.query.chat || null
  controller.getMessages(filterMessages)
    .then((messageList) => {
      console.log(messageList)
      response.success(req, res, messageList, 200)
    })
    .catch(e =>{
      response.error(req, res, 'Unexpected Error', 500 ,e )
    }) 
})

router.post('/', upload.single('file'), function(req, res) {
  console.log(req.file)

  controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
  .then((fullMessage)=>{
    response.success(res,res, fullMessage, 200)
  })
  .catch(e =>{
    console.log(e)
    response.error(req, res, 'Informacion invalida', 400, 'Error in controller ')
  })
})

router.patch('/:id',function(req, res){
  controller.updateMessage(req.params.id, req.body.message)
    .then((data)=>{
      response.success(req, res, data, 200)
    })
    .catch(e =>{
      response.error(req, res, 'Error interno', 500)
    })
})

router.delete('/:id', function(req, res){
  console.log(`[NETWORK REQ.PARAMS.ID] ${req.params.id}`)
  controller.deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, `Mensaje ${req.params.id} eliminado!`, 200)
    })
    .catch(e =>{
      response.error(res, req,'Error Interno', 500, e )
    })
})

module.exports = router