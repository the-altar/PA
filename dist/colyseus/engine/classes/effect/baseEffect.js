"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
const typechart_1 = require("../../helpers/typechart");
const enums_1 = require("../../enums");
class Effect {
    constructor(data) {
        this.tick = 0;
        this.duration = data.duration;
        this.delay = data.delay || 0;
        this.disabled = data.disabled || false;
        this.linked = data.linked || false;
        this.type = data.type;
        this.behavior = data.behavior || enums_1.effectTargetBehavior.Default;
        this.activationType = data.activationType || enums_1.activationType.Immediate;
    }
    execute(targets, world, skillType) {
        return false;
    }
    getActivationType() {
        return this.activationType;
    }
    calculateDamageBonus(skillType, char) {
        let mod = 1;
        for (const typing in skillType) {
            for (const type in char.getTyping()) {
                mod *= typechart_1.typeChart(type, typing);
            }
        }
        return mod;
    }
    getType() {
        return this.type;
    }
}
exports.Effect = Effect;
//# sourceMappingURL=baseEffect.js.map