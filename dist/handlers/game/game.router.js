"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRouter = void 0;
const game_controller_1 = require("./game.controller");
const express_1 = require("express");
exports.gameRouter = express_1.Router();
exports.gameRouter.get('/', game_controller_1.file);
exports.gameRouter.get('/enums', game_controller_1.pokemonTypeEnums);
exports.gameRouter.get('/ingame', game_controller_1.file);
exports.gameRouter.get('/lobby', game_controller_1.file);
//# sourceMappingURL=game.router.js.map