"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyGain = void 0;
const base_1 = require("./base");
const enums_1 = require("../../enums");
class EnergyGain extends base_1.Effect {
    constructor(data, caster) {
        super(data, caster);
        this.energyType = data.energyType;
    }
    functionality(char, origin, world) {
        this.triggered = true;
        const p = world.findPlayerByCharacterIndex(this.caster);
        let index;
        if (this.energyType === enums_1.CostTypes.Random)
            index = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
        else
            index = this.energyType;
        p.increaseEnergyPool(index, this.value);
    }
    generateToolTip() {
        if (this.triggerClause !== enums_1.triggerClauseType.None && !this.triggered) {
            switch (this.triggerClause) {
                case enums_1.triggerClauseType.onKnockOut: {
                    this.message = `If Knocked out a PP gain effect will be triggered`;
                }
            }
        }
        else {
            if (this.delay > 0) {
                this.message = `In ${this.delay} turns this character will gain ${this.value} extra PP`;
            }
            else {
                this.message = `This character will gain ${this.value} extra PP`;
            }
        }
    }
}
exports.EnergyGain = EnergyGain;
//# sourceMappingURL=energyRelated.js.map