"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestructibleDefense = void 0;
const base_1 = require("./base");
const enums_1 = require("../../enums");
class DestructibleDefense extends base_1.Effect {
    constructor(data, caster) {
        super(data, caster);
        this.targetChar = null;
        this.hasBeenApplied = false;
    }
    functionality(char, origin) {
        if (this.hasBeenApplied)
            return;
        char.setBuff({
            buffType: enums_1.BuffTypes.DestructibleDefense,
            value: this.value
        });
        this.targetChar = char;
        this.hasBeenApplied = true;
    }
    progressTurn() {
        this.tick++;
        if (this.targetChar !== null && this.value > this.targetChar.getBuffs().destructibleDefense) {
            this.value = this.targetChar.getBuffs().destructibleDefense;
        }
        this.generateToolTip();
        if (this.delay > 0) {
            this.delay--;
            return this.tickOn();
        }
        this.duration--;
        let { terminate, activate } = this.tickOn();
        if (this.value <= 0)
            terminate = true;
        if (this.targets.length === 0)
            terminate = true;
        if (terminate)
            this.effectConclusion();
        return { terminate, activate };
    }
    effectConclusion() {
        if (this.targetChar !== null && this.value > 0)
            this.targetChar.getBuffs().destructibleDefense -= this.value;
    }
    generateToolTip() {
        this.message = `This character has ${this.value} destructible defense`;
    }
}
exports.DestructibleDefense = DestructibleDefense;
//# sourceMappingURL=destructibleDefense.js.map