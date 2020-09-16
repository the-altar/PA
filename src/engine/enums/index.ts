export enum memberRank {
    Guest, Member, Admin, Webmaster, 
}

export enum effectType {
    Damage, Invulnerability, DamageReduction, CooldownIncreasal, CooldownReduction, Healing,
    Stun, HealthDrain, EnergyRemoval, EnergyGain, EnergySteal, SkillTargetMod, Counter, IncreaseDamageTaken,
    DecreaseDamageTaken, EffectRemoval, DamageIncreasal, AbsorbDamage, AlterEffectValue, None, ResetCooldown
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
    Invulnerability, CooldownReduction, DecreaseDamageTaken, DamageIncreasal, AbsorbDamage
}

export enum DebuffTypes {
    DamageReduction, CooldownIncreasal, Stun, IncreaseDamageTaken
}

export enum CostTypes {
    Speed, Strength, Elemental, Wisdom, Random
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
