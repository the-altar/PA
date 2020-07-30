"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DamageReduction = void 0;
const effect_1 = require("./effect");
const enums_1 = require("../../enums");
class DamageReduction extends effect_1.Effect {
    constructor(data, caster) {
        super(data, caster);
        this.reductionValue = data.reductionValue,
            this.typing = data.typing;
        this.damageType = data.damageType;
    }
    execute(targets, world, skillType) {
        return this.effectTargetApplication(skillType, targets, world);
    }
    functionality(char, skillType) {
        char.setDebuff({
            damageType: this.damageType,
            value: this.reductionValue,
            skillType: this.typing,
            debuffType: enums_1.DebuffTypes.DamageReduction
        });
    }
}
exports.DamageReduction = DamageReduction;
//# sourceMappingURL=damageReduction.js.map