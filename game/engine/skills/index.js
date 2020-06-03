class Skill {
    constructor(data){
        this.cost = data.cost
        this.disabled = data.disabled
        this.skillpic = data.skillpic
        this.name = data.name
        this.description = data.description
        this.class = data.class
        this.startCooldown = data.startCooldown
        this.baseCooldown = data.baseCooldown
        this.type = data.type

        //console.log(data.effects)
    }

    getCost(){
        return this.cost
    }
    setCost(cost){
        this.cost = cost
    }
    isDisabled(){
        if(this.disabled) return true
        return false
    }
    setDisabled(condition){
        this.disabled = condition
    }
    getClass(){
        return this.class
    }
    getStartCooldown(){
        return this.startCooldown
    } 
    setStartCooldown(startCooldown){
        this.startCooldown = startCooldown
    }
    getBaseCooldown(){
        return this.baseCooldown
    } 
    setBaseCooldown(baseCooldown){
        this.baseCooldown = baseCooldown
    }
    getType(){
        return this.type
    }
    setType(type){
        this.type = type
    }
}

module.exports = Skill 