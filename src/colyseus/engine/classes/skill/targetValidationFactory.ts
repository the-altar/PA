import { Character } from "../character"
import { Skill } from "../skill"
import { targetType } from "../../enums"

export const targetSetter = function (skill: Skill, targetMode: targetType, characters: Array<Character>, playerId: string, self?: number): Array<number> {
    let choices: Array<number> = []

    switch (targetMode) {

        case targetType.OneEnemy: {
            characters.forEach((char, index) => {
                if (!char.belongsTo(playerId) && !char.isKnockedOut()) {
                    const isInvulnerable = char.isInvulnerable(skill.getTypes())
                    if (!isInvulnerable) choices.push(index)
                }
            })
            return choices
        }

        case targetType.AllEnemies: {
            characters.forEach((char, index) => {
                if (!char.belongsTo(playerId) && !char.isKnockedOut()) {
                    const isInvulnerable = char.isInvulnerable(skill.getTypes())
                    if (!isInvulnerable) choices.push(index)
                }
            })
            return choices
        }

        case targetType.Self: {
            const isInvulnerable = characters[self].isInvulnerable(skill.getTypes())
            if (!isInvulnerable && !characters[self].isKnockedOut()) choices.push(self)
            return choices
        }
    }
}