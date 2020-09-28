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
exports.user = exports.pokemonTypeEnums = exports.file = void 0;
const enums_1 = require("../../engine/enums");
const db_1 = require("../../db");
exports.file = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.sendFile('index.html', { root: './public/game' });
});
exports.pokemonTypeEnums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        pokemonTypings: enums_1.Types,
        effectTypings: enums_1.effectType,
        activationTypings: enums_1.activationType,
        damageTypings: enums_1.DamageType,
        costTypings: enums_1.CostTypes,
        skillClassTypings: enums_1.SkillClassType,
        targetModeTypings: enums_1.targetType,
        effectTargetBehaviorTypings: enums_1.effectTargetBehavior,
        triggerClauseTypings: enums_1.triggerClauseType,
    });
});
exports.user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.res.locals.id;
    const text = `select u.id, u.avatar, u.username, u.coins,
    jsonb_build_object('elo', lb.elo, 'wins', lb.wins, 'losses', lb.losses, 'streak', lb.streak, 'maxStreak', lb.max_streak, 'exp', lb.experience, 'seasonRank', lb.season_rank, 'seasonLevel', lb.season_level) as season, 
    jsonb_build_object('authLevel', ur.auth_level, 'rankName', ur."name") as rank 
    from users as u 
    left join ladderboard as lb 
        on u.id = lb.user_id 
    left join user_rank as ur 
        on u.user_rank_id = ur.id
    where u.id = $1;
    `;
    try {
        const doc = yield db_1.pool.query(text, [id]);
        res.status(200).json(doc.rows[0]);
    }
    catch (err) {
        throw (err);
    }
});
//# sourceMappingURL=game.controller.js.map