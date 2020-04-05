const helpers = require('./utils')

module.exports = class Effect {

    constructor(skill) {
        for (const key in skill) {
            this[key] = skill[key]
        }
    }
    
    damage(target, skill) {
        const damage = helpers.checkDD(target.activeEffects, this)
        target.health = target.health - damage
        if(target.health < 0) target.health = 0
    }

    healing(target, skill) {
        target.health = target.health + this.value
        if (target.health > 100) target.health = 100
    }

    stun(target, skill) {
        target.disabled = true
    }

    gainEnergy(target, skill) {
        target.energy = target.energy + this.value
    }

    energyDrain(target, skill) {
        const drained = target.energy
        target.energy = target.energy - this.value
        return drained
    }

    healthDrain(target, skill) {
        const drained = target.health
        target.health = target.health - this.value
        return drained
    }

    destructibleDefense(target, skill){
        if(target.activeEffects[skill.name] === undefined){
            target.activeEffects[skill.name] = {
                skillInfo:skill
            }
        }

        if (target.activeEffects[skill.name]['destructibleDefense'] == undefined){
            target.activeEffects[skill.name]['destructibleDefense'] = []
        }
        
        target.activeEffects[skill.name]['destructibleDefense'].push({
            value: this.value,
            duration: this.duration
        })
    }
}