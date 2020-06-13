"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const mongoUri = process.env.MONGODB_URI || "mongodb://heroku_v71xlm18:7jhpcdfn01bp88mb9cp2ncq7ng@ds161018.mlab.com:61018/heroku_v71xlm18";
const port = Number(process.env.PORT) || 3000;
new server_1.Coliseum(port, mongoUri).run();
//# sourceMappingURL=index.js.map