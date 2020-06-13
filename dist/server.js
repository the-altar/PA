"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coliseum = void 0;
const colyseus_1 = require("colyseus");
const http_1 = require("http");
const express_1 = require("./express");
const colyseus_2 = require("./colyseus");
exports.Coliseum = class {
    constructor(port, dburl) {
        this.port = port;
        this.db = dburl;
        this.server = new colyseus_1.Server({
            server: http_1.createServer(new express_1.App({ mongoUri: this.db }).run())
        });
        this.rooms();
    }
    rooms() {
        this.server.define('rankedLobby', colyseus_2.RankedLobby);
        this.server.define("battle", colyseus_2.Battle);
        this.server.define("lobby", colyseus_2.Lobby);
    }
    run() {
        this.server.listen(this.port);
        console.log(`Server is running on port ${this.port}`);
    }
};
//# sourceMappingURL=server.js.map