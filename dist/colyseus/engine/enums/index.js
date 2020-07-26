"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Types = exports.DamageType = exports.effectTargetBehavior = exports.targetType = exports.activationType = exports.effectType = void 0;
var effectType;
(function (effectType) {
    effectType[effectType["Damage"] = 0] = "Damage";
    effectType[effectType["Invulnerability"] = 1] = "Invulnerability";
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
var effectTargetBehavior;
(function (effectTargetBehavior) {
    effectTargetBehavior[effectTargetBehavior["Default"] = 0] = "Default";
    effectTargetBehavior[effectTargetBehavior["OnlyOne"] = 1] = "OnlyOne";
    effectTargetBehavior[effectTargetBehavior["AllOthers"] = 2] = "AllOthers";
    effectTargetBehavior[effectTargetBehavior["IfEnemy"] = 3] = "IfEnemy";
    effectTargetBehavior[effectTargetBehavior["IfAlly"] = 4] = "IfAlly";
    effectTargetBehavior[effectTargetBehavior["ifSelf"] = 5] = "ifSelf";
    effectTargetBehavior[effectTargetBehavior["Random"] = 6] = "Random";
})(effectTargetBehavior = exports.effectTargetBehavior || (exports.effectTargetBehavior = {}));
var DamageType;
(function (DamageType) {
    DamageType[DamageType["Normal"] = 0] = "Normal";
    DamageType[DamageType["Piercing"] = 1] = "Piercing";
    DamageType[DamageType["Affliction"] = 2] = "Affliction";
    DamageType[DamageType["True"] = 3] = "True";
})(DamageType = exports.DamageType || (exports.DamageType = {}));
var Types;
(function (Types) {
    Types[Types["Bug"] = 0] = "Bug";
    Types[Types["Dark"] = 1] = "Dark";
    Types[Types["Dragon"] = 2] = "Dragon";
    Types[Types["Electric"] = 3] = "Electric";
    Types[Types["Fairy"] = 4] = "Fairy";
    Types[Types["Fighting"] = 5] = "Fighting";
    Types[Types["Fire"] = 6] = "Fire";
    Types[Types["Flying"] = 7] = "Flying";
    Types[Types["Ghost"] = 8] = "Ghost";
    Types[Types["Grass"] = 9] = "Grass";
    Types[Types["Ground"] = 10] = "Ground";
    Types[Types["Ice"] = 11] = "Ice";
    Types[Types["Normal"] = 12] = "Normal";
    Types[Types["Poison"] = 13] = "Poison";
    Types[Types["Psychic"] = 14] = "Psychic";
    Types[Types["Rock"] = 15] = "Rock";
    Types[Types["Steel"] = 16] = "Steel";
    Types[Types["Water"] = 17] = "Water";
    Types[Types["Any"] = 18] = "Any";
})(Types = exports.Types || (exports.Types = {}));
//# sourceMappingURL=index.js.map