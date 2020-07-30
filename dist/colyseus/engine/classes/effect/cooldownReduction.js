"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CooldownReduction = void 0;
const effect_1 = require("./effect");
const enums_1 = require("../../enums");
class CooldownReduction extends effect_1.Effect {
    constructor(data, caster) {
        super(data, caster);
        this.numTurns = data.numTurns;
        this.specific = data.specific;
    }
    execute(targets, world, skillType) {
        return this.effectTargetApplication(skillType, targets, world);
    }
    functionality(char, skillType) {
        char.setBuff({
            buffType: enums_1.BuffTypes.CooldownReduction,
            value: this.numTurns,
            specific: this.specific
        });
    }
}
exports.CooldownReduction = CooldownReduction;
//# sourceMappingURL=cooldownReduction.js.map