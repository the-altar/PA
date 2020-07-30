"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Damage = void 0;
const effect_1 = require("./effect");
class Damage extends effect_1.Effect {
    constructor(data, caster) {
        super(data, caster);
        this.damageType = data.damageType;
        this.damage_value = data.damage_value;
    }
    getDamageValue() {
        return this.damage_value;
    }
    getDamageType() {
        return this.damageType;
    }
    execute(targets, world, skillType) {
        const c = world.findCharacterById(this.caster);
        const { reduction } = c.getDebuffs().getDamageReduction({
            damageType: this.damageType,
            skillType: Number(skillType[0])
        });
        this.damage_value -= reduction;
        return this.effectTargetApplication(skillType, targets, world);
    }
    functionality(char, skillType) {
        let damage = this.damage_value * this.calculateDamageBonus(skillType, char);
        if (damage < 0)
            damage = 0;
        const hp = char.geHitPoints() - Math.round(damage / 5) * 5;
        char.setHitPoints(hp);
    }
}
exports.Damage = Damage;
//# sourceMappingURL=damage.js.map