"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterRouter = void 0;
const express_1 = require("express");
const character_controller_1 = require("./character.controller");
const router = express_1.Router();
router.get("/", character_controller_1.getAll);
router.post('/upload', character_controller_1.upload);
router.post('/delete', character_controller_1.remove);
router.post('/new', character_controller_1.create);
router.post('/update', character_controller_1.update);
exports.characterRouter = router;
//# sourceMappingURL=character.router.js.map