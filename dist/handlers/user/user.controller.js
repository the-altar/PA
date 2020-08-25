"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDataController = exports.loggerMiddleware = void 0;
const enums_1 = require("../../colyseus/engine/enums");
function loggerMiddleware(req, res, next) {
    if (req.cookies.session) {
        req.res.locals.hasCookie = true;
    }
    else {
        req.res.locals.guest = true;
    }
    next();
}
exports.loggerMiddleware = loggerMiddleware;
exports.userDataController = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        if (req.res.locals.guest) {
            user = generateGuest();
        }
        return res.json(user);
    });
};
const generateGuest = () => {
    return {
        username: `GUEST-${Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 2)}`,
        rank: enums_1.memberRank[enums_1.memberRank.Guest],
        avatar: Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 5),
    };
};
//# sourceMappingURL=user.controller.js.map