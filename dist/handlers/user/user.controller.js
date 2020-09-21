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
exports.logout = exports.login = exports.register = exports.userCharacters = exports.userDataController = exports.loggerMiddleware = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const db_1 = require("../../db");
function loggerMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.session_id;
            if (token) {
                req.res.locals.guest = false;
                req.res.locals.user = yield jsonwebtoken_1.verify(token, process.env.TOKEN_SECRET);
            }
            else
                req.res.locals.guest = true;
            next();
        }
        catch (err) {
            throw (err);
        }
    });
}
exports.loggerMiddleware = loggerMiddleware;
exports.userDataController = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        if (req.res.locals.guest) {
            user = generateGuest();
            return res.json(user);
        }
        const text = `select json_build_object('authLevel', ur.auth_level, 'rankName', ur.name) as "rank", 
        u.id, u.avatar, u.username, u.passhash, u.wins, u.losses, u.streak, u.experience, u.elo from users as u
        join user_rank as ur
        on u.user_rank_id = ur.id
        where u.id = $1;`;
        try {
            const id = req.res.locals.user.id;
            const data = yield db_1.pool.query(text, [id]);
            delete data.rows[0].passhash;
            return res.json(data.rows[0]);
        }
        catch (err) {
            throw (err);
        }
    });
};
exports.userCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const text = `select jsonb_build_object('id', entity.id) || entity.data || 
    jsonb_build_object('skills', jsonb_agg(skills.data)) as data 
    from entity join (select skill.id, skill.data || 
    jsonb_build_object('id', skill.id) || jsonb_build_object('effects', jsonb_agg( effect.data || 
    jsonb_build_object('id', effect.id))) as data, skill.entity_id from skill 
    join effect on effect.skill_id = skill.id group by skill.id 
    ) as skills on skills.entity_id = entity.id group by entity.id;`;
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
exports.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const text = `INSERT INTO users (username, passhash, email) values ($1, $2, $3);`;
    try {
        const hashed = yield bcrypt_1.hash(req.body.password, 10);
        yield db_1.pool.query(text, [req.body.username, hashed, req.body.email]);
        return res.json({ success: true });
    }
    catch (err) {
        return res.json({ success: false, err: err });
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const text = `select json_build_object('authLevel', ur.auth_level, 'rankName', ur.name) as "rank", u.id, u.avatar, u.username, u.passhash, u.wins, u.losses, u.streak, u.experience, u.elo from users as u
    join user_rank as ur
    on u.user_rank_id = ur.id
    where u.username = $1;`;
    try {
        const data = yield db_1.pool.query(text, [req.body.username]);
        const user = data.rows[0];
        const match = yield bcrypt_1.compare(req.body.password, user.passhash);
        if (match) {
            delete user.passhash;
            const token = jsonwebtoken_1.sign({ id: user.id, authLevel: user.rank.authLevel }, process.env.TOKEN_SECRET, { expiresIn: '365d' });
            res.cookie('session_id', token, { httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000 });
            return res.json({ userData: user, success: true });
        }
        return res.json({ success: false });
    }
    catch (err) {
        throw (err);
    }
});
exports.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("session_id");
    return res.json(generateGuest());
});
const generateGuest = () => {
    return {
        "rank": { "authLevel": -1, "rankName": "Guest" },
        "id": Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 12),
        "avatar": "1.jpg",
        "username": `GUEST-${Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 2)}`,
        "wins": 0,
        "losses": 0,
        "streak": 0,
        "experience": 0,
        "elo": 0
    };
};
//# sourceMappingURL=user.controller.js.map