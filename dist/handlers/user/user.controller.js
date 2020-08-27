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
exports.userCharacters = exports.userDataController = exports.loggerMiddleware = void 0;
const enums_1 = require("../../engine/enums");
const db_1 = require("../../db");
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
exports.userCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const text = `select 
	jsonb_build_object('id', entity.id) || entity."data" || 
	jsonb_build_object('skills', 
		jsonb_agg( skill."data" || jsonb_build_object('id', skill.id))) 
    as "char" 
    from entity
    join skill on skill.entity_id = entity.id 
    group by entity.id;`;
    try {
        const r = yield db_1.pool.query(text);
        return res.json(r.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        return res.send("Something went wrong...");
    }
});
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
        id: Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 9),
    };
};
//# sourceMappingURL=user.controller.js.map