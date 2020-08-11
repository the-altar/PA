"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.effectFactory = void 0;
const enums_1 = require("../../enums");
const base_1 = require("./base");
const invulnerability_1 = require("./invulnerability");
const damageRelated_1 = require("./damageRelated");
const healthRelated_1 = require("./healthRelated");
const cooldownRelated_1 = require("./cooldownRelated");
const energyRelated_1 = require("./energyRelated");
const stunRelated_1 = require("./stunRelated");
const skillTargetMod_1 = require("./skillTargetMod");
const counter_1 = require("./counter");
__exportStar(require("./base"), exports);
exports.effectFactory = function (effect, caster) {
    switch (effect.type) {
        case enums_1.effectType.Damage: {
            return new damageRelated_1.Damage(effect, caster);
        }
        case enums_1.effectType.Invulnerability: {
            return new invulnerability_1.Invulnerability(effect, caster);
        }
        case enums_1.effectType.DamageReduction: {
            return new damageRelated_1.DamageReduction(effect, caster);
        }
        case enums_1.effectType.CooldownReduction: {
            return new cooldownRelated_1.CooldownReduction(effect, caster);
        }
        case enums_1.effectType.CooldownIncreasal: {
            return new cooldownRelated_1.CooldownIncreasal(effect, caster);
        }
        case enums_1.effectType.Healing: {
            return new healthRelated_1.Healing(effect, caster);
        }
        case enums_1.effectType.HealthDrain: {
            return new healthRelated_1.HealthDrain(effect, caster);
        }
        case enums_1.effectType.EnergyGain: {
            return new energyRelated_1.EnergyGain(effect, caster);
        }
        case enums_1.effectType.Stun: {
            return new stunRelated_1.Stun(effect, caster);
        }
        case enums_1.effectType.SkillTargetMod: {
            return new skillTargetMod_1.SkillTargetMod(effect, caster);
        }
        case enums_1.effectType.Counter: {
            return new counter_1.Counter(effect, caster);
        }
        default: {
            return new base_1.Effect(effect, caster);
        }
    }
};
//# sourceMappingURL=index.js.map