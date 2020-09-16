"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerClauseType = exports.PlayerPhase = exports.SkillClassType = exports.CostTypes = exports.DebuffTypes = exports.BuffTypes = exports.Types = exports.DamageType = exports.effectTargetBehavior = exports.targetType = exports.activationType = exports.effectType = exports.memberRank = void 0;
var memberRank;
(function (memberRank) {
    memberRank[memberRank["Guest"] = 0] = "Guest";
    memberRank[memberRank["Member"] = 1] = "Member";
    memberRank[memberRank["Admin"] = 2] = "Admin";
    memberRank[memberRank["Webmaster"] = 3] = "Webmaster";
})(memberRank = exports.memberRank || (exports.memberRank = {}));
var effectType;
(function (effectType) {
    effectType[effectType["Damage"] = 0] = "Damage";
    effectType[effectType["Invulnerability"] = 1] = "Invulnerability";
    effectType[effectType["DamageReduction"] = 2] = "DamageReduction";
    effectType[effectType["CooldownIncreasal"] = 3] = "CooldownIncreasal";
    effectType[effectType["CooldownReduction"] = 4] = "CooldownReduction";
    effectType[effectType["Healing"] = 5] = "Healing";
    effectType[effectType["Stun"] = 6] = "Stun";
    effectType[effectType["HealthDrain"] = 7] = "HealthDrain";
    effectType[effectType["EnergyRemoval"] = 8] = "EnergyRemoval";
    effectType[effectType["EnergyGain"] = 9] = "EnergyGain";
    effectType[effectType["EnergySteal"] = 10] = "EnergySteal";
    effectType[effectType["SkillTargetMod"] = 11] = "SkillTargetMod";
    effectType[effectType["Counter"] = 12] = "Counter";
    effectType[effectType["IncreaseDamageTaken"] = 13] = "IncreaseDamageTaken";
    effectType[effectType["DecreaseDamageTaken"] = 14] = "DecreaseDamageTaken";
    effectType[effectType["EffectRemoval"] = 15] = "EffectRemoval";
    effectType[effectType["DamageIncreasal"] = 16] = "DamageIncreasal";
    effectType[effectType["AbsorbDamage"] = 17] = "AbsorbDamage";
    effectType[effectType["AlterEffectValue"] = 18] = "AlterEffectValue";
    effectType[effectType["None"] = 19] = "None";
    effectType[effectType["ResetCooldown"] = 20] = "ResetCooldown";
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
    targetType[targetType["OneEnemyAndSelf"] = 7] = "OneEnemyAndSelf";
    targetType[targetType["OneEnemyAndAllAllies"] = 8] = "OneEnemyAndAllAllies";
    targetType[targetType["OneAllyAndSelf"] = 9] = "OneAllyAndSelf";
    targetType[targetType["AllEnemiesAndSelf"] = 10] = "AllEnemiesAndSelf";
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
var BuffTypes;
(function (BuffTypes) {
    BuffTypes[BuffTypes["Invulnerability"] = 0] = "Invulnerability";
    BuffTypes[BuffTypes["CooldownReduction"] = 1] = "CooldownReduction";
    BuffTypes[BuffTypes["DecreaseDamageTaken"] = 2] = "DecreaseDamageTaken";
    BuffTypes[BuffTypes["DamageIncreasal"] = 3] = "DamageIncreasal";
    BuffTypes[BuffTypes["AbsorbDamage"] = 4] = "AbsorbDamage";
})(BuffTypes = exports.BuffTypes || (exports.BuffTypes = {}));
var DebuffTypes;
(function (DebuffTypes) {
    DebuffTypes[DebuffTypes["DamageReduction"] = 0] = "DamageReduction";
    DebuffTypes[DebuffTypes["CooldownIncreasal"] = 1] = "CooldownIncreasal";
    DebuffTypes[DebuffTypes["Stun"] = 2] = "Stun";
    DebuffTypes[DebuffTypes["IncreaseDamageTaken"] = 3] = "IncreaseDamageTaken";
})(DebuffTypes = exports.DebuffTypes || (exports.DebuffTypes = {}));
var CostTypes;
(function (CostTypes) {
    CostTypes[CostTypes["Speed"] = 0] = "Speed";
    CostTypes[CostTypes["Strength"] = 1] = "Strength";
    CostTypes[CostTypes["Elemental"] = 2] = "Elemental";
    CostTypes[CostTypes["Wisdom"] = 3] = "Wisdom";
    CostTypes[CostTypes["Random"] = 4] = "Random";
})(CostTypes = exports.CostTypes || (exports.CostTypes = {}));
var SkillClassType;
(function (SkillClassType) {
    SkillClassType[SkillClassType["Special"] = 0] = "Special";
    SkillClassType[SkillClassType["Physical"] = 1] = "Physical";
    SkillClassType[SkillClassType["Status"] = 2] = "Status";
})(SkillClassType = exports.SkillClassType || (exports.SkillClassType = {}));
var PlayerPhase;
(function (PlayerPhase) {
    PlayerPhase[PlayerPhase["EnemyTurn"] = 0] = "EnemyTurn";
    PlayerPhase[PlayerPhase["MyTurn"] = 1] = "MyTurn";
})(PlayerPhase = exports.PlayerPhase || (exports.PlayerPhase = {}));
var triggerClauseType;
(function (triggerClauseType) {
    triggerClauseType[triggerClauseType["None"] = 0] = "None";
    triggerClauseType[triggerClauseType["onKnockOut"] = 1] = "onKnockOut";
})(triggerClauseType = exports.triggerClauseType || (exports.triggerClauseType = {}));
//# sourceMappingURL=index.js.map