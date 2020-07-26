export * from "./effect"
export * from "./character"
export * from "./player"
export * from "./skill"

export interface iSkillQueue {
    skill: number,
    caster: number,
    targets: Array<number>
}

