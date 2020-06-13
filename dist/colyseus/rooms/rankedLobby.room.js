"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankedLobby = void 0;
const colyseus_1 = require("colyseus");
class ClientManager {
    constructor() {
        this.clientList = {};
    }
    addClient(id, client, connection) {
        this.clientList[id] = {
            elo: 0,
            connection: null
        };
        this.clientList[id].elo = client.elo;
        this.clientList[id].connection = connection;
    }
    getClientConnectionById(id) {
        return this.clientList[id];
    }
    getAllClientsId() {
        return Object.keys(this.clientList);
    }
    getClientById(id) {
        return Object.assign({}, this.clientList[id]);
    }
    getAllClients() {
        return this.clientList;
    }
    removeClientById(id) {
        delete this.clientList[id];
    }
    count() {
        return Object.keys(this.clientList).length;
    }
    getRankedMap() {
        const mappedHash = Object.keys(this.clientList).sort((a, b) => {
            return this.clientList[a].elo - this.clientList[b].elo;
        }).map((sortedKey) => {
            return this.clientList[sortedKey];
        });
        return mappedHash;
    }
}
class RankedLobby extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.manager = new ClientManager();
        this.evaluateGroupInterval = 5000;
    }
    // When room is initialized
    onCreate(options) {
        this.setSimulationInterval(() => __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield colyseus_1.matchMaker.createRoom('battle', {});
                const queue = this.manager.getRankedMap();
                for (let i = 1; i < queue.length; i = i + 2) {
                    for (let j = i - 1; j <= i; j++) {
                        const seat = yield colyseus_1.matchMaker.reserveSeatFor(room, {});
                        queue[j].connection.send('seat', seat);
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
        }), this.evaluateGroupInterval);
    }
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(client, options, request) {
        return true;
    }
    // When client successfully join the room
    onJoin(client, options, auth) {
        this.manager.addClient(client.sessionId, options, client);
    }
    // When a client leaves the room
    onLeave(client, consented) {
        this.manager.removeClientById(client.sessionId);
    }
}
exports.RankedLobby = RankedLobby;
//# sourceMappingURL=rankedLobby.room.js.map