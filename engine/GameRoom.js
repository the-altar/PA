const Character = require('./roster/character')
const helpers = require('./helpers')

module.exports = class PlayerGame {
    constructor(player, enemy, myturn) {
        this.team = []
        this.opponent = enemy.id
        this.enemyTeam = []
        this.connection = player.connection
        this.myturn = myturn
        this.timeOut = false

        for (const i in player.characters) {
            this.team.push(new Character(player.characters[i]))
        }
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
        const turnCaster = {}
        let skillsUsed = {}
        for (const index in instructions) {

            const targets = instructions[index].targets
            let foes = []
            for (const t in targets) {
                foes.push(this.findChar(targets[t].target, targets[t].position))
            }

            const caster = this.findChar(instructions[index].caster, instructions[index].position)
            const skill = caster.char.skills[instructions[index].skillIndex]

            skill.execute(foes)

            skill.cooldown = skill.baseCooldown
            caster.char.energy -= skill.cost
            skillsUsed[skill.id] = skill
            turnCaster[caster.char.id] = (turnCaster[caster.char.id] || 0) + 1
        }

        return {
            executioners: turnCaster,
            skillsUsed: skillsUsed
        }
    }

    clearCooldown(turn) {
        for (const i in this.team) {
            const skills = this.team[i].skills
            for (const index in skills) {
                if (turn.skillsUsed[skills[index].id] === undefined) {
                    if (skills[index].cooldown > 0) skills[index].cooldown -= 1
                }
            }
        }
    }

    replenishEnergy(turn) {
        for (const i in this.team) {
            if (turn.executioners[this.team[i].id] !== undefined) continue
            else {
                this.team[i].energy += 10
                if (this.team[i].energy > 100) this.team[i].energy = 100
            }
        }
    }

    removeEmptyEffects() {
        for (const i in this.team) {
            helpers.removeEffects(this.team[i])
        }
        for (const i2 in this.enemyTeam){
            helpers.removeEffects(this.enemyTeam[i2])
        }
    }

    findChar(target, pos) {
        if (this.team[pos].id == target) {
            return {
                char: this.team[pos],
                isEnemy: false
            }
        }
        else return {
            char: this.enemyTeam[pos],
            isEnemy: true
        }
    }
}   