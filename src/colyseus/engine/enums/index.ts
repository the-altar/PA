export enum effectType {
    Damage, Invulnerability, DamageReduction, CooldownIncreasal, CooldownReduction, Healing,
    Stun, HealthDrain, EnergyRemoval, EnergyGain, EnergySteal, SkillTargetMod, Counter
}

export enum activationType {
    Stunned, Damaged, Targeted, Immediate, Expired, Killed, Healed, Countered, Reflected
}

export enum targetType {
    OneEnemy, AllEnemies, OneAlly, AllAllies, AllAlliesExceptSelf, Any, Self, OneEnemyAndSelf, OneEnemyAndAllAllies, OneAllyAndSelf, AllEnemiesAndSelf
}

export enum effectTargetBehavior {
    Default, OnlyOne, AllOthers, IfEnemy, IfAlly, ifSelf, Random
}

export enum DamageType {
    Normal, Piercing, Affliction, True
}

export enum Types {
    Bug, Dark, Dragon, Electric, Fairy, Fighting, Fire, Flying, Ghost, Grass, Ground, Ice, Normal, Poison, Psychic, Rock, Steel, Water, Any
}

export enum BuffTypes {
    Invulnerability, CooldownReduction
}

export enum DebuffTypes {
    DamageReduction, CooldownIncreasal, Stun
}

export enum CostTypes {
    Speed, Strenght, Elemental, Wisdom, Random
}

export enum SkillClassType {
    Special, Physical, Status
}

export enum PlayerPhase {
    EnemyTurn, MyTurn
}

export enum triggerClauseType {
    None, onKnockOut
}
