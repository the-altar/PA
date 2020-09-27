"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buffs = void 0;
const enums_1 = require("../../enums");
const z_helpers_1 = require("../effect/z.helpers");
class Buffs {
    constructor() {
        this.invulnerability = {};
        this.cooldownReduction = { any: 0 };
        this.decreaseDamageTaken = {};
        this.damageIncreasal = {};
        this.absorbDamage = {};
    }
    setInvulnerability(params) {
        const { skillType } = params;
        this.invulnerability[skillType] = true;
    }
    isInvulnerable(types, eType) {
        if (!z_helpers_1.isHarmful(eType))
            return false;
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
            res.decreased += this.decreaseDamageTaken[enums_1.Types.Any][enums_1.DamageType.True] || 0;
            res.hasBeenDecreased = true;
        }
        if (skillType !== enums_1.Types.Any) {
            if (this.decreaseDamageTaken[skillType] !== undefined) {
                res.decreased += this.decreaseDamageTaken[skillType][enums_1.DamageType.True] || 0;
                if (this.decreaseDamageTaken[skillType][damageType] !== undefined) {
                    res.decreased += this.decreaseDamageTaken[skillType][damageType] || 0;
                    res.hasBeenDecreased = true;
                }
            }
        }
        return res;
    }
    setDamageIncreasal(params) {
        const { skillType, damageType, value } = params;
        if (this.damageIncreasal[skillType] === undefined) {
            this.damageIncreasal[skillType] = {
                [damageType]: value
            };
        }
        else {
            this.damageIncreasal[skillType][damageType] += value;
        }
    }
    getDamageIncreasal(params) {
        const { skillType, damageType } = params;
        const res = {
            increased: 0,
            hasBeenIncreased: false
        };
        if (this.damageIncreasal[enums_1.Types.Any] !== undefined) {
            res.increased += this.damageIncreasal[enums_1.Types.Any][damageType] || 0;
            res.hasBeenIncreased = true;
        }
        if (skillType !== enums_1.Types.Any) {
            if (this.damageIncreasal[skillType] !== undefined) {
                if (this.damageIncreasal[skillType][damageType] !== undefined) {
                    res.increased += this.damageIncreasal[skillType][damageType] || 0;
                    res.hasBeenIncreased = true;
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
    setAbsorbDamage(params) {
        const { skillType, damageType, value } = params;
        if (this.absorbDamage[skillType] === undefined) {
            this.absorbDamage[skillType] = {
                [damageType]: value
            };
        }
        else {
            this.absorbDamage[skillType][damageType] += value;
        }
    }
    getAbsorbDamage(params) {
        const { skillType, damageType } = params;
        const res = {
            conversionRate: 0,
            hasBeenAbsorbed: false
        };
        if (this.absorbDamage[enums_1.Types.Any] !== undefined) {
            const t = this.absorbDamage[enums_1.Types.Any][enums_1.DamageType.True] || 0;
            res.conversionRate += (this.absorbDamage[enums_1.Types.Any][damageType] || 0) + t;
            res.hasBeenAbsorbed = true;
        }
        if (skillType !== enums_1.Types.Any) {
            if (this.absorbDamage[skillType] !== undefined) {
                const t = this.absorbDamage[skillType][enums_1.DamageType.True] || 0;
                if (this.absorbDamage[skillType][damageType] !== undefined) {
                    res.conversionRate += this.absorbDamage[skillType][damageType] || 0;
                    res.hasBeenAbsorbed = true;
                }
                if (t > 0)
                    res.hasBeenAbsorbed = true;
                res.conversionRate += t;
            }
        }
        return res;
    }
    clearCooldownReduction() {
        this.cooldownReduction = { any: 0 };
    }
    clearInvulnerability() {
        this.invulnerability = {};
    }
    clearDamageIncreasal() {
        this.damageIncreasal = {};
    }
    clearDecreaseDamageTaken() {
        this.decreaseDamageTaken = {};
    }
    clearAbsorbDamage() {
        this.absorbDamage = {};
    }
}
exports.Buffs = Buffs;
//# sourceMappingURL=buffs.js.map