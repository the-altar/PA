"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const root_router_1 = require("./handlers/root/root.router");
const character_router_1 = require("./handlers/character/character.router");
const game_router_1 = require("./handlers/game/game.router");
const user_1 = require("./handlers/user");
class App {
    constructor(appInit) {
        this.app = express_1.default();
        this.database(appInit.mongoUri);
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app
            .use(express_fileupload_1.default())
            .use(cookie_parser_1.default())
            .use(body_parser_1.default.json())
            .use(body_parser_1.default.urlencoded({ extended: true }))
            .use(express_1.default.static('public', { maxAge: "10d" }))
            .use(express_1.default.static('public/main', { maxAge: '7d' }))
            .use('/game', express_1.default.static('public/game', { maxAge: '7d' }));
    }
    routes() {
        this.app.use("/user", user_1.userRouter);
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