"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const root_router_1 = require("./handlers/root/root.router");
const character_router_1 = require("./handlers/character/character.router");
const game_router_1 = require("./handlers/game/game.router");
class App {
    constructor(appInit) {
        this.app = express_1.default();
        this.database(appInit.mongoUri);
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app.use(express_fileupload_1.default());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static('public', { maxAge: "10d" }));
        this.app.use(express_1.default.static('public/main', { maxAge: '7d' }));
        this.app.use('/game', express_1.default.static('public/game', { maxAge: '7d' }));
    }
    routes() {
        this.app.use('/game', game_router_1.gameRouter);
        this.app.use('/character', character_router_1.characterRouter);
        this.app.use("/", root_router_1.rootRouter);
    }
    database(url) {
        mongoose_1.default.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
            .then(() => console.log("DB CONNECTED"))
            .catch(err => console.error(err));
    }
    run() {
        return this.app;
    }
}
exports.App = App;
//# sourceMappingURL=express.js.map