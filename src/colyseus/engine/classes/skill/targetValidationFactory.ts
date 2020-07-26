import { Character } from "../character"
import { targetType } from "../../enums"

export const targetSetter = function (targetMode: targetType, characters: Array<Character>, playerId: string, self?:number): Array<number> {
    let choices: Array<number> = []

    switch (targetMode) {

        case targetType.OneEnemy: {
            characters.forEach((char, index) => {
                if (!char.belongsTo(playerId)) choices.push(index)
            })
            return choices
        }

        case targetType.AllEnemies: {
            characters.forEach((char, index) => {
                if (!char.belongsTo(playerId)) choices.push(index)
            })
            return choices
        }

        case targetType.Self: {
            choices.push(self)
            return choices
        }
    }
}