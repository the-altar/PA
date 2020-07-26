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
    execute(targets, skillList) {
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
                        const hp = char.geHitPoints() - this.damage_value;
                        char.setHitPoints(hp);
                    }
                }
                break;
            case enums_1.effectTargetBehavior.OnlyOne:
                {
                    const hp = targets[0].geHitPoints() - this.damage_value;
                    targets[0].setHitPoints(hp);
                }
                break;
            case enums_1.effectTargetBehavior.AllOthers:
                {
                    for (const char of targets.slice(1, targets.length)) {
                        const hp = char.geHitPoints() - this.damage_value;
                        char.setHitPoints(hp);
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
//# sourceMappingURL=damage.js.map