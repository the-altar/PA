"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CooldownIncreasal = void 0;
const effect_1 = require("./effect");
const enums_1 = require("../../enums");
class CooldownIncreasal extends effect_1.Effect {
    constructor(data, caster) {
        super(data, caster);
        this.numTurns = data.numTurns;
        this.specific = data.specific;
    }
    execute(targets, world, skillType) {
        return this.effectTargetApplication(skillType, targets, world);
    }
    functionality(char, skillType) {
        char.setDebuff({
            debuffType: enums_1.DebuffTypes.CooldownIncreasal,
            value: this.numTurns,
            specific: this.specific
        });
    }
}
exports.CooldownIncreasal = CooldownIncreasal;
//# sourceMappingURL=cooldownIncreasal.js.map