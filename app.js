const app = require("./settings").router();
const http = require("http");
const colyseus = require('colyseus');
const port = process.env.PORT || 3000;

const RankedLobby = require('./colyseus').RankedLobby
const Battle = require('./colyseus').Battle
const Lobby = require('./colyseus').Lobby;

require('./mongoose')(() => {
    require('./routes')(app)    
    const gameServer = new colyseus.Server({
        server: http.createServer(app)
    })
    
    gameServer.define("rankedLobby", RankedLobby)
    gameServer.define("battle", Battle)
    gameServer.define("lobby", Lobby)
    gameServer.listen(port)
    console.log(`Listening on ws://localhost:${ port }`)
})


