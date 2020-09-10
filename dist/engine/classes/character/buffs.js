"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buffs = void 0;
const enums_1 = require("../../enums");
class Buffs {
    constructor() {
        this.invulnerability = {};
        this.cooldownReduction = { any: 0 };
        this.decreaseDamageTaken = {};
    }
    setInvulnerability(params) {
        const { skillType } = params;
        this.invulnerability[skillType] = true;
    }
    isInvulnerable(types) {
        if (this.invulnerability[enums_1.Types.Any])
            return true;
        for (const t of types) {
            if (this.invulnerability[t])
                return true;
        }
        return false;
    }
    setDecreaseDamageTaken(params) {
        const { damageType, value, skillType } = params;
        if (this.decreaseDamageTaken[skillType] === undefined) {
            this.decreaseDamageTaken[skillType] = {
                [damageType]: value
            };
        }
        else {
            this.decreaseDamageTaken[skillType][damageType] += value;
        }
    }
    getDecreaseDamageTaken(params) {
        const { skillType, damageType } = params;
        const res = {
            decreased: 0,
            hasBeenDecreased: false
        };
        if (this.decreaseDamageTaken[enums_1.Types.Any] !== undefined) {
            res.decreased += this.decreaseDamageTaken[enums_1.Types.Any][damageType] || 0;
            res.hasBeenDecreased = true;
        }
        if (skillType !== enums_1.Types.Any) {
            if (this.decreaseDamageTaken[skillType] !== undefined) {
                if (this.decreaseDamageTaken[skillType][damageType] !== undefined) {
                    res.decreased += this.decreaseDamageTaken[skillType][damageType] || 0;
                    res.hasBeenDecreased = true;
                }
            }
        }
        return res;
    }
    setCooldownReduction(params) {
        const { specific, value } = params;
        if (specific) {
            this.cooldownReduction[specific] = value + (0 || this.cooldownReduction[specific]);
        }
        else {
            this.cooldownReduction.any = value + (0 || this.cooldownReduction.any);
        }
    }
    getCooldownReduction(specific) {
        let r = this.cooldownReduction.any;
        if (specific) {
            if (this.cooldownReduction[specific])
                r += this.cooldownReduction[specific];
        }
        return -r;
    }
    clearCooldownReduction() {
        this.cooldownReduction = { any: 0 };
    }
    clearInvulnerability() {
        this.invulnerability = {};
    }
    clearDecreaseDamageTaken() {
        this.decreaseDamageTaken = {};
    }
}
exports.Buffs = Buffs;
//# sourceMappingURL=buffs.js.map