"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Damage = void 0;
const effect_1 = require("./effect");
class Damage extends effect_1.Effect {
    constructor(effectData) {
        super(effectData);
        this.damageType = effectData.damageType;
        this.damage_value = effectData.damage_value;
    }
    getDamageType() {
        return this.damageType;
    }
    getDamageValue() {
        return this.damage_value;
    }
}
exports.Damage = Damage;
//# sourceMappingURL=damage.js.map