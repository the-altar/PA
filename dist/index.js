"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const mongoUri = process.env.MONGODB_URI;
const port = Number(process.env.PORT);
new server_1.Coliseum(port, mongoUri).run();
//# sourceMappingURL=index.js.map