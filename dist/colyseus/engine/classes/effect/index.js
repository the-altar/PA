"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.effectFactory = void 0;
const enums_1 = require("../../enums");
const damage_1 = require("./damage");
const invulnerability_1 = require("./invulnerability");
exports.effectFactory = function (effect, caster) {
    switch (effect.type) {
        case enums_1.effectType.Damage: {
            return new damage_1.Damage(effect, caster);
        }
        case enums_1.effectType.Invulnerability: {
            return new invulnerability_1.Invulnerability(effect, caster);
        }
    }
};
//# sourceMappingURL=index.js.map