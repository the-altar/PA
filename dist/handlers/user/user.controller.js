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
exports.updateGameResults = exports.logout = exports.login = exports.register = exports.userCharacters = exports.userDataController = exports.loggerMiddleware = void 0;
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
        const text = `select u.id, u.avatar, u.username, u.passhash, u.coins, 
    jsonb_build_object('elo', lb.elo, 'wins', lb.wins, 'losses', lb.losses, 'streak', lb.streak, 'maxStreak', lb.max_streak, 'exp', lb.experience, 'seasonRank', lb.season_rank, 'seasonLevel', lb.season_level) as season, 
    jsonb_build_object('authLevel', ur.auth_level, 'rankName', ur."name") as rank 
    from users as u 
    left join ladderboard as lb 
        on u.id = lb.user_id 
    left join user_rank as ur 
        on u.user_rank_id = ur.id
    where u.id = $1;`;
        try {
            const id = req.res.locals.user.id;
            const data = yield db_1.pool.query(text, [id]);
            delete data.rows[0].passhash;
            validateRanking(data.rows[0]);
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
    const text = `select u.id, u.avatar, u.username, u.passhash, u.coins, 
    jsonb_build_object('elo', lb.elo, 'wins', lb.wins, 'losses', lb.losses, 'streak', lb.streak, 'maxStreak', lb.max_streak, 'exp', lb.experience, 'seasonRank', lb.season_rank, 'seasonLevel', lb.season_level) as season, 
    jsonb_build_object('authLevel', ur.auth_level, 'rankName', ur."name") as rank 
    from users as u 
    left join ladderboard as lb 
        on u.id = lb.user_id 
    left join user_rank as ur 
        on u.user_rank_id = ur.id
    where u.id = $1;`;
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
exports.updateGameResults = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.id < 0)
        return;
    const text = `
    update ladderboard 
    set 
        wins = $1, 
        losses = $2,	
        elo = $3,
        streak = $4, 
        max_streak = $5, 
        experience = $6,
        season_level = $7,
        season_rank = $8
    where season = $9 and user_id = $10;	
    `;
    const userText = `update users set coins=$1 where id=$2`;
    const { wins, losses, streak, elo, id, exp, maxStreak, seasonLevel, seasonRank, coins } = payload;
    const values = [wins, losses, elo, streak, maxStreak, exp, seasonLevel, seasonRank, 0, id];
    try {
        yield db_1.pool.query(text, values);
        yield db_1.pool.query(userText, [coins, id]);
    }
    catch (err) {
        throw (err);
    }
});
const generateGuest = () => {
    return {
        "rank": { "authLevel": -1, "rankName": "Guest" },
        "id": Math.floor((Math.random() * 1000000) + 1) * -1,
        "avatar": "1.jpg",
        "coins": 0,
        "username": `GUEST-${Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 2)}`,
        "season": {
            elo: 1000,
            wins: 0,
            losses: 0,
            streak: 0,
            exp: 0,
            maxStreak: 0,
            seasonRank: "Rookie",
            seasonLevel: 0
        }
    };
};
const validateRanking = (data) => {
    if (data.season.elo === null || data.season.elo === undefined) {
        db_1.pool.query(`insert into ladderboard(season, user_id) values($1, $2)`, [0, data.id]).catch(err => {
            throw (err);
        });
        data.season = {
            elo: 1000,
            wins: 0,
            losses: 0,
            streak: 0,
            exp: 0,
            maxStreak: 0,
            seasonRank: 'Rookie',
            seasonLevel: 1,
        };
        return;
    }
};
//# sourceMappingURL=user.controller.js.map