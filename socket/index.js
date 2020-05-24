const charDB = require('../model/index').Character;
const REQUEST = require("./blog/request");
const GAME = require("./blog/game");

module.exports = function (server) {
    const io = require('socket.io')(server)
    io.on('connection', client => {
       REQUEST(client);
       GAME(client);
    })
}