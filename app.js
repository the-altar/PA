const app = require("./settings").router();
const http = require("http");
const colyseus = require('colyseus');
const port = process.env.PORT || 3000;
const cleanRecords = require('./controllers/playerList').CleanAllRecords

const Lobby = require('./colyseus').Lobby

require('./mongoose')(() => {
    cleanRecords()
    require('./routes')(app)
    
    const gameServer = new colyseus.Server({
        server: http.createServer(app)
    })

    gameServer.define("lobby", Lobby)
    gameServer.listen(port)
    console.log(`Listening on ws://localhost:${ port }`)
})


