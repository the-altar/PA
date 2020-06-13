import http from "http";
import { Room, Client, matchMaker } from "colyseus";

export interface iClient {
    elo: number,
    connection?: Client
}


class ClientManager {
    private clientList: {[key:string]:iClient}

    constructor() {
        this.clientList = {}
    }

    public addClient(id: string, client: iClient, connection: Client): void {
        this.clientList[id] = {
            elo: 0,
            connection: null
        } 
        this.clientList[id].elo = client.elo
        this.clientList[id].connection = connection
    }

    public getClientConnectionById(id: string): iClient {
        return this.clientList[id]
    }

    public getAllClientsId(): Array<string> {
        return Object.keys(this.clientList)
    }

    public getClientById(id: string): iClient {
        return {
            ...this.clientList[id]
        }
    }

    public getAllClients(): {[key: string]: iClient}{
        return this.clientList
    }

    public removeClientById(id: string): void {
        delete this.clientList[id]
    }

    public count(): number {
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
                const room = await matchMaker.createRoom('battle', {})
                const queue = this.manager.getRankedMap()
                for (let i = 1; i < queue.length; i = i + 2) {
                    for (let j = i - 1; j <= i; j++) {
                        const seat = await matchMaker.reserveSeatFor(room, {})
                        queue[j].connection.send('seat', seat)
                    }
                }
            } catch (err) {
                console.error(err)
            }

        }, this.evaluateGroupInterval)
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(client: Client, options: any, request: http.IncomingMessage): boolean {
        return true
    }

    // When client successfully join the room
    onJoin(client: Client, options: any, auth: any) {
        this.manager.addClient(client.sessionId, options, client)
    }

    // When a client leaves the room
    onLeave(client: Client, consented: boolean) {
        this.manager.removeClientById(client.sessionId)
    }
}