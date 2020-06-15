const express = require('express')
const app = express()
const server = require('http').Server(app)

const config = require('./config')
console.log(config)
const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require('./socket')
const db = require('./db') 
const router = require('./network/routes')

db(config.dbUrl)

app.use(cors())

app.use(bodyParser.json()) // agregamos json para que acepte las peticiones de ese tipo, asi como urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// app.use(router)
socket.connect(server)
router(app)

app.use(config.publicRoute , express.static('public'))

server.listen(config.port, function(){
  console.log('La app esta escuchando en' + config.host+': '+ config.port)
})
