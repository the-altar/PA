import { Character } from "../character"
import { Skill } from "../skill"
import { targetType } from "../../enums"

export const targetSetter = function (skill: Skill, targetMode: targetType, characters: Array<Character>, playerId: string, self?: number): {[x:string]:Array<number>} {
    let choices: {[x:string]:Array<number>} = {}
    choices.choice=[]
    choices.auto=[]

    switch (targetMode) {

        case targetType.OneEnemy: {
            characters.forEach((char, index) => {
                if (!char.belongsTo(playerId) && !char.isKnockedOut()) {
                    const isInvulnerable = char.isInvulnerable(skill.getTypes())
                    if (!isInvulnerable) choices.choice.push(index)
                }
            })
            return choices
        }

        case targetType.OneEnemyAndSelf: {
            characters.forEach((char, index)=>{
                if(!char.belongsTo(playerId) && !char.isKnockedOut()){
                    const isInvulnerable = char.isInvulnerable(skill.getTypes())
                    if(!isInvulnerable) choices.choice.push(index)
                }
            })
            choices.auto.push(self)
            return choices 
        }

        case targetType.AllEnemies: {
            characters.forEach((char, index) => {
                if (!char.belongsTo(playerId) && !char.isKnockedOut()) {
                    const isInvulnerable = char.isInvulnerable(skill.getTypes())
                    if (!isInvulnerable) choices.choice.push(index)
                }
            })
            return choices
        }

        case targetType.Self: {
            const isInvulnerable = characters[self].isInvulnerable(skill.getTypes())
            if (!isInvulnerable && !characters[self].isKnockedOut()) choices.choice.push(self)
            return choices
        }
    }
}