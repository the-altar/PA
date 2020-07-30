"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debuffs = void 0;
const enums_1 = require("../../enums");
class Debuffs {
    constructor() {
        this.damageReduction = {};
        this.cooldownIncreasal = { any: 0 };
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
            res.reduction += this.damageReduction[enums_1.Types.Any][damageType];
            res.hasBeenReduced = true;
        }
        if (this.damageReduction[skillType] !== undefined) {
            if (this.damageReduction[skillType][damageType] !== undefined) {
                res.reduction += this.damageReduction[skillType][damageType];
                res.hasBeenReduced = true;
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
    getCooldownIncreasal(specific) {
        let r = this.cooldownIncreasal.any;
        if (specific) {
            if (this.cooldownIncreasal[specific])
                r += this.cooldownIncreasal[specific];
        }
        return r;
    }
    clearDebuffs() {
        this.damageReduction = {};
        this.cooldownIncreasal = { any: 0 };
    }
}
exports.Debuffs = Debuffs;
//# sourceMappingURL=debuffs.js.map