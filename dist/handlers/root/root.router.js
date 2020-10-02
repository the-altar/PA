"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const root_controller_1 = require("./root.controller");
const middlewares_1 = require("../../middlewares");
const router = express_1.Router();
router.get('/', root_controller_1.baseController);
router.put('/upload', root_controller_1.uploadController);
router.post('/upload', root_controller_1.uploadController);
router.get("/news", root_controller_1.news);
router.get("/news/:id/:siteArea", root_controller_1.findNews);
router.post("/news", [middlewares_1.authenticateAdmin], root_controller_1.postNews);
router.put("/news", [middlewares_1.authenticateAdmin], root_controller_1.updateNews);
router.post("/news/post", [middlewares_1.authenticate], root_controller_1.postComment);
exports.rootRouter = router;
//# sourceMappingURL=root.router.js.map