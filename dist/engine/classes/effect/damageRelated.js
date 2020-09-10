"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecreaseDamageTaken = exports.IncreaseDamageTaken = exports.DamageReduction = exports.Damage = void 0;
const base_1 = require("./base");
const enums_1 = require("../../enums");
class Damage extends base_1.Effect {
    constructor(data, caster) {
        super(data, caster);
        this.damageType = data.damageType;
    }
    functionality(char, origin, world) {
        const reduction = this.getDamageReduction(world, origin);
        const { increasal } = char.getDebuffs().getIncreasedDamage({ damageType: this.damageType, skillType: origin.getTypes()[0] });
        const { decreased } = char.getBuffs().getDecreaseDamageTaken({ damageType: this.damageType, skillType: origin.getTypes()[0] });
        let damage = (this.value - ((reduction + decreased) - increasal)) * this.calculateDamageBonus(origin, char);
        if (damage < 0)
            damage = 0;
        const hp = char.geHitPoints() - Math.round(damage / 5) * 5;
        char.setHitPoints(hp);
        if (char.isKnockedOut()) {
            world.executeSkills(enums_1.activationType.Immediate, enums_1.triggerClauseType.onKnockOut);
        }
    }
    getDamageReduction(world, origin) {
        const { char } = world.findCharacterById(this.caster);
        const { reduction } = char.getDebuffs().getDamageReduction({
            damageType: this.damageType,
            skillType: Number(origin.getTypes()[0])
        });
        return reduction;
    }
    generateToolTip() {
        if (this.delay > 0) {
            this.message = `this character will take ${this.value} damage for ${this.duration} turns in ${this.delay} turns`;
        }
        else {
            this.message = `this.character will take ${this.value} damage`;
        }
    }
}
exports.Damage = Damage;
class DamageReduction extends base_1.Effect {
    constructor(data, caster) {
        super(data, caster);
        this.skillType = data.skillType;
        this.damageType = data.damageType;
    }
    functionality(char, origin) {
        char.setDebuff({
            damageType: this.damageType,
            value: this.value,
            skillType: this.skillType,
            debuffType: enums_1.DebuffTypes.DamageReduction
        });
    }
    generateToolTip() {
        if (this.delay > 0) {
            this.message = `This character will deal ${this.value} less damage in ${this.delay} turns`;
        }
        else {
            this.message = `This character will deal ${this.value} less damage`;
        }
    }
}
exports.DamageReduction = DamageReduction;
class IncreaseDamageTaken extends base_1.Effect {
    constructor(data, caster) {
        super(data, caster);
        this.skillType = data.skillType;
        this.damageType = data.damageType;
    }
    functionality(char, origin) {
        char.setDebuff({
            damageType: this.damageType,
            value: this.value,
            skillType: this.skillType,
            debuffType: enums_1.DebuffTypes.IncreaseDamageTaken
        });
    }
    generateToolTip() {
        this.message = `This character will take ${this.value} more damage`;
    }
}
exports.IncreaseDamageTaken = IncreaseDamageTaken;
class DecreaseDamageTaken extends base_1.Effect {
    constructor(data, caster) {
        super(data, caster);
        this.skillType = data.skillType;
        this.damageType = data.damageType;
    }
    functionality(char, origin) {
        char.setBuff({
            damageType: this.damageType,
            value: this.value,
            skillType: this.skillType,
            buffType: enums_1.BuffTypes.DecreaseDamageTaken
            //class?: SkillClassType;
        });
    }
    generateToolTip() {
        this.message = `This character has ${this.value} points of damage reduction`;
    }
}
exports.DecreaseDamageTaken = DecreaseDamageTaken;
//# sourceMappingURL=damageRelated.js.map