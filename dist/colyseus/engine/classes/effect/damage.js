"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Damage = void 0;
const baseEffect_1 = require("./baseEffect");
class Damage extends baseEffect_1.Effect {
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
        if (this.duration <= 0)
            return true;
        const params = {
            value: this.damage_value,
            type: skillType,
            damageBonus: this.calculateDamageBonus
        };
        this.effectTargetApplication(params, this.dealDamage, targets, world);
        return false;
    }
    dealDamage(params, char) {
        const { damageBonus, type, value } = params;
        let damage = value * damageBonus(type, char);
        if (damage < 0)
            damage = 0;
        const hp = char.geHitPoints() - Math.round(damage / 5) * 5;
        char.setHitPoints(hp);
    }
}
exports.Damage = Damage;
//# sourceMappingURL=damage.js.map