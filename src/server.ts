import { Server } from 'colyseus'
import { createServer } from 'http'
import { App } from "./express"
import {Battle, Lobby, RankedLobby} from "./colyseus"

export const Coliseum = class {
    private server: Server
    private port: number;
    private db: string;

    constructor(port: number, dburl: string) {
        this.port = port
        this.db = dburl
        this.server = new Server({
            server: createServer(new App({ mongoUri: this.db }).run())
        })
        this.rooms()
    }

    private rooms():void {
        this.server.define('rankedLobby', RankedLobby)
        this.server.define("battle", Battle)
        this.server.define("lobby", Lobby)
    }

    public run():void{
        this.server.listen(this.port)
        console.log(`Server is running on port ${this.port}`)
    } 
}
