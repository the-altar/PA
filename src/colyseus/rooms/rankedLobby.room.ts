import http from "http";
import { Room, Client, matchMaker } from "colyseus";

export interface iClient {
    elo: number,
    pid:string,
    connection?: Client,
}


class ClientManager {
    private clientList: {[key:string]:iClient}
    private onlineList: {[key:string]:boolean}

    constructor() {
        this.clientList = {}
        this.onlineList = {}
    }

    isClientConnected(pid:string):boolean {
        if(this.onlineList[pid] !== undefined ) return true
        return false 
    }

    public addClient(id: string, client: iClient, connection: Client): void {
        this.clientList[id] = {
            elo: client.elo,
            connection: connection,
            pid:client.pid
        } 
        this.onlineList[client.pid] =  true
    }

    public getClientConnectionBySessionId(id: string): iClient {
        return this.clientList[id]
    }

    public getAllClientsSessionId(): Array<string> {
        return Object.keys(this.clientList)
    }

    public getClientBySessionId(id: string): iClient {
        return {
            ...this.clientList[id]
        }
    }

    public getAllClients(): {[key: string]: iClient}{
        return this.clientList
    }

    public removeClientBySessionId(id: string): void {
        if(this.clientList[id] === undefined) {
            return
        }
        const pid = this.clientList[id].pid
        delete this.onlineList[pid]
        delete this.clientList[id]        
    }

    public countPlayersOnline(): number {
        return Object.keys(this.clientList).length
    }

    public getRankedMap(): Array<iClient> {
        const mappedHash = Object.keys(this.clientList).sort((a, b) => {
            return this.clientList[a].elo - this.clientList[b].elo
        }).map((sortedKey) => {
            return this.clientList[sortedKey]
        })
        return mappedHash
    }
}

export class RankedLobby extends Room {
    private manager: ClientManager = new ClientManager()
    private evaluateGroupInterval: number = 5000
    // When room is initialized
    onCreate(options: any) {
        this.setSimulationInterval(async () => {
            try {
                const queue = this.manager.getRankedMap()
                for (let i = 1; i < queue.length; i = i + 2) {
                    const room = await matchMaker.createRoom('battle', {})
                    
                    for (let j = i - 1; j <= i; j++) {
                        const seat = await matchMaker.reserveSeatFor(room, {})
                        queue[j].connection.send('seat', seat)
                        this.manager.removeClientBySessionId(queue[j].connection.sessionId)
                    }
                }
            } catch (err) {
                throw(err)
            }

        }, this.evaluateGroupInterval)
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(client: Client, options: any, request: http.IncomingMessage): boolean {
        if(this.manager.isClientConnected(options.pid)) return false
        return true
    }

    // When client successfully join the room
    onJoin(client: Client, options: any, auth: any) {
        this.manager.addClient(client.sessionId, options, client)
    }

    // When a client leaves the room
    onLeave(client: Client, consented: boolean) {
        this.manager.removeClientBySessionId(client.sessionId)
    }

    async onDispose(){
    }
}