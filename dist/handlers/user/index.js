"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = express_1.Router();
router.get("/", user_controller_1.loggerMiddleware, user_controller_1.mount);
router.get("/character", user_controller_1.userCharacters);
router.post("/register", user_controller_1.register);
router.post("/login", user_controller_1.login);
router.post("/logout", user_controller_1.logout);
router.post("/:username", user_controller_1.user);
exports.userRouter = router;
//# sourceMappingURL=index.js.map