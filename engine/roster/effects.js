function checkDD(activeEffects, skill){
    for(const key in activeEffects){
        if(activeEffects[key].destructibleDefense !== undefined){
            for(const i in activeEffects[key].destructibleDefense){
                let dd = activeEffects[key].destructibleDefense[i] 
                dd.value = dd.value - skill.value 

                if(dd.value >= 0) {
                    return 0
                } else {
                    activeEffects[key].destructibleDefense.splice(i, 1)
                    return (-1)*(dd.value)
                }
            }
        }
    }
    return skill.value
}

module.exports = class Effect {

    constructor(skill) {
        for (const key in skill) {
            this[key] = skill[key]
        }
    }
    
    damage(target, skill) {
        target.health = target.health - checkDD(target.activeEffects, this)
    }

    healing(target, skill) {
        target.health = target.health + this.value
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