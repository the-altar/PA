"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buffs = void 0;
const enums_1 = require("../../enums");
class Buffs {
    constructor() {
        this.invulnerability = {};
        this.cooldownReduction = { any: 0 };
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
}
exports.Buffs = Buffs;
//# sourceMappingURL=buffs.js.map