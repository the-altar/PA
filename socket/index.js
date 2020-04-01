const GManager = require('../engine/RoomManager')
const CharModel = require("../model").Character

module.exports = function (server) {
    
    const GM = new GManager()

    const io = require('socket.io')(server)

    io.on('connection', function (socket) {
        require('./homeCalls')(socket, CharModel, GM)
    })

}