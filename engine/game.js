const Character = require('./roster/character')
const CharModel = require('../model').Character

module.exports = class PlayerGame {
    constructor(player, enemy, myturn, callback) {
        this.team = []
        this.opponent = enemy.id
        this.enemyTeam = []
        this.connection = player.connection
        this.myturn = myturn
        this.timeOut = false

        CharModel.find().where('_id').in(player.characters).exec((err, records) => {
            if (err) {
                console.log(err)
                return
            }
            for (const i in records) {
                this.team.push(new Character(records[i]))
            }
            callback()
        })
    }

    getGameStatus() {
        return {
            opponent: this.opponent,
            foes: this.enemyTeam,
            friends: this.team,
            myturn: this.myturn
        }
    }

    startCountDown(enemy) {
        const that = this
        this.timeOut = setTimeout(function () {
            const eId = that.opponent

            that.myturn = false
            enemy.myturn = true

            that.connection.emit("forcedEndTurn", that.getGameStatus())
            enemy.connection.emit("startTurn", enemy.getGameStatus())
        }, 60000)
    }

    executeInstructions(instructions) {
        for (const index in instructions) {
            const targets = instructions[index].targets
            let foes = []
            for(const t in targets){
                foes.push(this.findChar(targets[t].target, targets[t].position))
            }

            const caster = this.findChar(instructions[index].caster, instructions[index].position)
            const skill = caster.skills[instructions[index].skillIndex]

            skill.execute(foes)
            caster.energy -= skill.cost 
        }
    }

    findChar(target, pos) {
        if (this.team[pos].id == target) return this.team[pos]
        else return this.enemyTeam[pos]
    }
}   