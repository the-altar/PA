export * from "./character"
export * from "./skill"

export interface iSkillQueue {
    skill: number,
    caster: number,
    targets: Array<number>
}

