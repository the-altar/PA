export enum effectType {
    Damage, Invulnerability
}

export enum activationType {
    Stunned, Damaged, Targeted, Immediate, Expired, Killed, Healed, Countered, Reflected
}

export enum targetType {
    OneEnemy, AllEnemies, OneAlly, AllAllies, AllAlliesExceptSelf, Any, Self, OneEnemyAndSelf, OneEnemyAndAllAllies, 
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

