const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

router.post('/', function(req, res ){
  controller.addUser(req.body.name)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(err =>{
      response.error(req, res , 'Internal Error ', 500, err)
    })
})

router.get('/', function(req, res) {
  const filterUser = req.query.name || null
  controller.listUsers()
    .then((userList) => {
      console.log(userList)
      response.success(req, res, userList, 200)
    })
    .catch(e =>{
      response.error(req, res, 'Unexpected Error', 500 ,e )
    }) 
})


module.exports = router