const bodyParser = require('body-parser')
const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors')

module.exports.router = function () {
    let app = express()
    //configurações publicas para dentro do servidor express, adicionando middlewares (body-parser,cors)
    app.use(express.static('public'))
    app.use(express.static('public/main'))
    app.use('/game', express.static('public/game'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(fileUpload())
    app.use(cors())
    return app
}