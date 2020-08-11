"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debuffs = void 0;
const enums_1 = require("../../enums");
class Debuffs {
    constructor() {
        this.damageReduction = {};
        this.cooldownIncreasal = { any: 0 };
        this.stun = {};
    }
    setDamageReduction(params) {
        const { skillType, damageType, value } = params;
        this.damageReduction[skillType] = {
            [damageType]: value
        };
    }
    getDamageReduction(params) {
        const { skillType, damageType } = params;
        const res = {
            reduction: 0,
            hasBeenReduced: false
        };
        if (this.damageReduction[enums_1.Types.Any] !== undefined) {
            res.reduction += this.damageReduction[enums_1.Types.Any][damageType] || 0;
            res.hasBeenReduced = true;
        }
        if (skillType !== enums_1.Types.Any) {
            if (this.damageReduction[skillType] !== undefined) {
                if (this.damageReduction[skillType][damageType] !== undefined) {
                    res.reduction += this.damageReduction[skillType][damageType] || 0;
                    res.hasBeenReduced = true;
                }
            }
        }
        return res;
    }
    setCooldownIncreasal(params) {
        const { specific, value } = params;
        if (specific) {
            this.cooldownIncreasal[specific] = value + (0 || this.cooldownIncreasal[specific]);
        }
        else {
            this.cooldownIncreasal.any = value + this.cooldownIncreasal.any;
        }
    }
    getCooldownIncreasal(params) {
        let r = this.cooldownIncreasal.any;
        if (params === undefined)
            return r;
        if (params.specific) {
            if (this.cooldownIncreasal[params.specific])
                r += this.cooldownIncreasal[params.specific];
        }
        return r;
    }
    setStun(params) {
        this.stun[params.specific] = true;
    }
    isStunned(params) {
        if (this.stun[params])
            return true;
        return false;
    }
    clearDebuffs() {
        this.damageReduction = {};
        this.cooldownIncreasal = { any: 0 };
        this.stun = {};
    }
}
exports.Debuffs = Debuffs;
//# sourceMappingURL=debuffs.js.map