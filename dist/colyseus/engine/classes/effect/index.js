"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.effectFactory = void 0;
const enums_1 = require("../../enums");
const damage_1 = require("./damage");
const effect_1 = require("./effect");
const invulnerability_1 = require("./invulnerability");
const damageReduction_1 = require("./damageReduction");
const cooldownReduction_1 = require("./cooldownReduction");
const cooldownIncreasal_1 = require("./cooldownIncreasal");
exports.effectFactory = function (effect, caster) {
    switch (effect.type) {
        case enums_1.effectType.Damage: {
            return new damage_1.Damage(effect, caster);
        }
        case enums_1.effectType.Invulnerability: {
            return new invulnerability_1.Invulnerability(effect, caster);
        }
        case enums_1.effectType.DamageReduction: {
            return new damageReduction_1.DamageReduction(effect, caster);
        }
        case enums_1.effectType.CooldownReduction: {
            return new cooldownReduction_1.CooldownReduction(effect, caster);
        }
        case enums_1.effectType.CooldownIncreasal: {
            return new cooldownIncreasal_1.CooldownIncreasal(effect, caster);
        }
        default: {
            return new effect_1.Effect(effect, caster);
        }
    }
};
//# sourceMappingURL=index.js.map