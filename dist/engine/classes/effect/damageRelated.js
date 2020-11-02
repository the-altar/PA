"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsorbDamage = exports.DecreaseDamageTaken = exports.IncreaseDamageTaken = exports.DamageIncreasal = exports.DamageReduction = exports.Damage = void 0;
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
        const { conversionRate } = char.getBuffs().getAbsorbDamage({ skillType: origin.getTypes()[0], damageType: this.damageType });
        let destructibleDefense = char.getBuffs().destructibleDefense || 0;
        let damageVal = Number(this.altValue) || this.value;
        let damage = (damageVal - ((reduction + decreased) - increasal)) * this.calculateDamageBonus(origin, char);
        damage = (Math.round(damage / 5) * 5);
        if (destructibleDefense > 0) {
            const ogDamage = damage;
            damage -= destructibleDefense;
            damage = Math.max(0, damage);
            char.getBuffs().destructibleDefense = Math.max(0, (destructibleDefense - ogDamage));
        }
        const absorbed = damage * (conversionRate / 100);
        const hp = char.geHitPoints() - damage + Math.round(absorbed / 5) * 5;
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
        const damageVal = Number(this.altValue) || this.value;
        if (this.delay > 0) {
            this.message = `this character will take ${damageVal} damage for ${this.duration} turns in ${this.delay} turns`;
        }
        else {
            this.message = `this character will take ${damageVal} damage`;
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
        const damageVal = Number(this.altValue) || this.value;
        if (this.delay > 0) {
            this.message = `This character will deal ${damageVal} less damage in ${this.delay} turns`;
        }
        else {
            this.message = `This character will deal ${damageVal} less damage`;
        }
    }
}
exports.DamageReduction = DamageReduction;
class DamageIncreasal extends base_1.Effect {
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
            buffType: enums_1.BuffTypes.DamageIncreasal
        });
    }
    generateToolTip() {
        if (this.delay > 0) {
            this.message = `This character will deal ${this.value} more damage`;
        }
        else {
            this.message = `This character will deal ${this.value} more damage`;
        }
    }
}
exports.DamageIncreasal = DamageIncreasal;
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
class AbsorbDamage extends base_1.Effect {
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
            buffType: enums_1.BuffTypes.AbsorbDamage
            //class?: SkillClassType;
        });
    }
    generateToolTip() {
        if (this.value === 100)
            this.message = `This character takes no damage from ${enums_1.Types[this.skillType]} skills`;
        else
            this.message = `This character will be healed by ${enums_1.Types[this.skillType]} skills`;
    }
}
exports.AbsorbDamage = AbsorbDamage;
//# sourceMappingURL=damageRelated.js.map