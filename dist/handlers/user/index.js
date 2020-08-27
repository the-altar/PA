"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = express_1.Router();
router.use(user_controller_1.loggerMiddleware);
router.get("/", user_controller_1.userDataController);
router.get("/character", user_controller_1.userCharacters);
exports.userRouter = router;
//# sourceMappingURL=index.js.map