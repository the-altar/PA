module.exports = class Effect {

    constructor(skill) {
        for (const key in skill) {
            this[key] = skill[key]
        }
    }
    
    damage(target) {
        target.health = target.health - this.value
    }

    healing(target) {
        target.health = target.health + this.value
    }

    stun(target) {
        target.disabled = true
    }

    gainEnergy(target) {
        target.energy = target.energy + this.value
    }

    energyDrain(target) {
        const drained = target.energy
        target.energy = target.energy - this.value
        return drained
    }

    healthDrain(target) {
        const drained = target.health
        target.health = target.health - this.value
        return drained
    }

}