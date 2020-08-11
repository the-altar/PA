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
exports.pokemonTypeEnums = exports.file = void 0;
const enums_1 = require("../../colyseus/engine/enums");
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
//# sourceMappingURL=game.controller.js.map