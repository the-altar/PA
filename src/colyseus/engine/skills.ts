interface iSkill {
    cost: Array<number>
    disabled?: Boolean
    skillpic: string
    name: string
    description: string
    class: string
    startCooldown: number
    baseCooldown: number
    type: { [key: string]: boolean }
    limit: number
}

export interface iSkillList {
    skills: Array<iSkill>
}

export class Skills {
    skillList: Array<iSkill>

    constructor(data: Array<iSkill>) {
        this.skillList = data
    }

    public validateSkills(energyPool: Array<number>) {
        let totalPool = energyPool.reduce((ca, cv) => ca + cv)

        for (const skill of this.skillList) {

            skill.disabled = false
            
            let totalCost = skill.cost.reduce((ca, cv) => ca + cv)

            if (totalCost > totalPool) {
                skill.disabled = true
                continue
            }

            for (let i = 0; i < 4; i++) {
                if (skill.cost[i] > energyPool[i]) {
                    skill.disabled = true
                    break
                }
            }
        }
    }
}