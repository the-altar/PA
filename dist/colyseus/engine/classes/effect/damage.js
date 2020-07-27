"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Damage = void 0;
const baseEffect_1 = require("./baseEffect");
const enums_1 = require("../../enums");
class Damage extends baseEffect_1.Effect {
    constructor(data) {
        super(data);
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
        this.tick++;
        if (this.tick % 2 === 0)
            return false;
        this.delay -= 1;
        if (this.delay >= 0)
            return false;
        this.duration -= 1;
        switch (this.behavior) {
            case enums_1.effectTargetBehavior.Default:
                {
                    for (const char of targets) {
                        dealDamage(this.damage_value, skillType, char, this.calculateDamageBonus);
                    }
                }
                break;
            case enums_1.effectTargetBehavior.OnlyOne:
                {
                    dealDamage(this.damage_value, skillType, targets[0], this.calculateDamageBonus);
                }
                break;
            case enums_1.effectTargetBehavior.AllOthers:
                {
                    for (const char of targets.slice(1, targets.length)) {
                        dealDamage(this.damage_value, skillType, char, this.calculateDamageBonus);
                    }
                }
                break;
        }
        if (this.duration <= 0)
            return true;
        return false;
    }
}
exports.Damage = Damage;
function dealDamage(value, skillType, char, bonus) {
    let damage = value * bonus(skillType, char);
    if (damage < 0)
        damage = 0;
    const hp = char.geHitPoints() - Math.round(damage / 5) * 5;
    char.setHitPoints(hp);
}
//# sourceMappingURL=damage.js.map