"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
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
    execute(targets, skillList) {
        return false;
    }
    getActivationType() {
        return this.activationType;
    }
}
exports.Effect = Effect;
//# sourceMappingURL=baseEffect.js.map