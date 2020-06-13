"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
class Effect {
    constructor(effect) {
        this.duration = effect.duration || 0;
        this.delay = effect.delay || 0;
        this.linked = effect.linked || false;
        this.target = effect.target;
        this.disabled = effect.disabled || false;
        this.activationType = effect.activationType;
    }
}
exports.Effect = Effect;
//# sourceMappingURL=effect.js.map