const bodyParser = require('body-parser') 
const express = require('express')
const cors = require('cors')

module.exports.router = function(){
    let app = express()    
    //configurações publicas para dentro do servidor express, adicionando middlewares (body-parser,cors)
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cors())
    return app
}