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
        this.onlineList = {};
    }
    isClientConnected(pid) {
        if (this.onlineList[pid] !== undefined)
            return true;
        return false;
    }
    addClient(id, client, connection) {
        this.clientList[id] = {
            elo: client.elo,
            connection: connection,
            pid: client.pid
        };
        this.onlineList[client.pid] = true;
    }
    getClientConnectionBySessionId(id) {
        return this.clientList[id];
    }
    getAllClientsSessionId() {
        return Object.keys(this.clientList);
    }
    getClientBySessionId(id) {
        return Object.assign({}, this.clientList[id]);
    }
    getAllClients() {
        return this.clientList;
    }
    removeClientBySessionId(id) {
        if (this.clientList[id] === undefined) {
            return;
        }
        const pid = this.clientList[id].pid;
        delete this.onlineList[pid];
        delete this.clientList[id];
    }
    countPlayersOnline() {
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
                const queue = this.manager.getRankedMap();
                for (let i = 1; i < queue.length; i = i + 2) {
                    const room = yield colyseus_1.matchMaker.createRoom('battle', {});
                    for (let j = i - 1; j <= i; j++) {
                        const seat = yield colyseus_1.matchMaker.reserveSeatFor(room, {});
                        queue[j].connection.send('seat', seat);
                        this.manager.removeClientBySessionId(queue[j].connection.sessionId);
                    }
                }
            }
            catch (err) {
                throw (err);
            }
        }), this.evaluateGroupInterval);
    }
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(client, options, request) {
        if (this.manager.isClientConnected(options.pid))
            return false;
        return true;
    }
    // When client successfully join the room
    onJoin(client, options, auth) {
        this.manager.addClient(client.sessionId, options, client);
    }
    // When a client leaves the room
    onLeave(client, consented) {
        this.manager.removeClientBySessionId(client.sessionId);
    }
    onDispose() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.RankedLobby = RankedLobby;
//# sourceMappingURL=rankedLobby.room.js.map