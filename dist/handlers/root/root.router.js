"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const root_controller_1 = require("./root.controller");
const router = express_1.Router();
router.get('/', root_controller_1.baseController);
router.put('/upload', root_controller_1.uploadController);
router.post('/upload', root_controller_1.uploadController);
router.get("/news", root_controller_1.findNews);
router.post("/news", root_controller_1.authenticateAdmin, root_controller_1.postNews);
exports.rootRouter = router;
//# sourceMappingURL=root.router.js.map