"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterEffectValue = void 0;
const base_1 = require("./base");
class AlterEffectValue extends base_1.Effect {
    constructor(data, caster) {
        super(data, caster);
        this.targetSkillId = data.targetSkillId || false;
        this.effectType = data.effectType;
        this.anyEffect = data.anyEffect || false;
        this.anySkill = data.anySkill || false;
        this.targetSkillName = '';
        this.incrementVal = data.incrementVal || 0;
        this.changedEffects = [];
        this.applied = data.applied || false;
    }
    functionality(char, origin, world) {
        if (this.applied)
            return;
        for (const skill of char.getSkills()) {
            if (!this.anySkill && skill.getId() !== this.targetSkillId)
                continue;
            for (const effect of skill.effects) {
                if (!this.anyEffect && this.effectType !== effect.getType())
                    continue;
                let originalIncrement = effect.mods.increment.value;
                let originalAltValue = effect.getAltValue();
                effect.setAltValue(this.value);
                effect.mods.increment.value = this.incrementVal;
                this.changedEffects.push({
                    effect, originalAltValue, originalIncrement
                });
            }
            this.targetSkillName = skill.name;
        }
        this.applied = true;
    }
    generateToolTip() {
        if (!this.anySkill) {
            this.message = `${this.targetSkillName} has been altered`;
        }
        else {
            this.message = "This character's skills have been altered";
        }
    }
    effectConclusion() {
        for (const payload of this.changedEffects) {
            payload.effect.setAltValue(payload.originalAltValue);
            payload.effect.mods.increment.value = payload.originalIncrement;
        }
    }
}
exports.AlterEffectValue = AlterEffectValue;
function reduceTargets(arr, char, world) {
    const newTargetArr = arr.getTargets().filter(index => {
        const affected = world.getCharactersByIndex([index])[0];
        if (affected.getId() !== char.getId())
            return true;
        return false;
    });
    arr.setTargets(newTargetArr);
    return newTargetArr;
}
//# sourceMappingURL=alterEffectValue.js.map