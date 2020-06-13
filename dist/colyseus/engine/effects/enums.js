"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DamageType = exports.targetType = exports.activationType = exports.effectType = void 0;
var effectType;
(function (effectType) {
    effectType[effectType["Damage"] = 0] = "Damage";
})(effectType = exports.effectType || (exports.effectType = {}));
var activationType;
(function (activationType) {
    activationType[activationType["Stunned"] = 0] = "Stunned";
    activationType[activationType["Damaged"] = 1] = "Damaged";
    activationType[activationType["Targeted"] = 2] = "Targeted";
    activationType[activationType["Immediate"] = 3] = "Immediate";
    activationType[activationType["Expired"] = 4] = "Expired";
    activationType[activationType["Killed"] = 5] = "Killed";
    activationType[activationType["Healed"] = 6] = "Healed";
    activationType[activationType["Countered"] = 7] = "Countered";
    activationType[activationType["Reflected"] = 8] = "Reflected";
})(activationType = exports.activationType || (exports.activationType = {}));
var targetType;
(function (targetType) {
    targetType[targetType["OneEnemy"] = 0] = "OneEnemy";
    targetType[targetType["AllEnemies"] = 1] = "AllEnemies";
    targetType[targetType["OneAlly"] = 2] = "OneAlly";
    targetType[targetType["AllAllies"] = 3] = "AllAllies";
    targetType[targetType["AllAlliesExceptSelf"] = 4] = "AllAlliesExceptSelf";
    targetType[targetType["Any"] = 5] = "Any";
    targetType[targetType["Self"] = 6] = "Self";
})(targetType = exports.targetType || (exports.targetType = {}));
var DamageType;
(function (DamageType) {
    DamageType[DamageType["Normal"] = 0] = "Normal";
    DamageType[DamageType["Piercing"] = 1] = "Piercing";
    DamageType[DamageType["Affliction"] = 2] = "Affliction";
    DamageType[DamageType["True"] = 3] = "True";
})(DamageType = exports.DamageType || (exports.DamageType = {}));
//# sourceMappingURL=enums.js.map