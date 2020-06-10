const Skill = require('../skills')

module.exports = class Character {
    constructor(data, playerId){
        this.name = data.name
        this.facepic = data.facepic
        this.description = data.description 
        this.hitPoints = data.hitPoints
        this.type = data.types
        this.energyGain = data.energyGain 
        this.skills = []
        this.belongs = playerId
        for(const skill of data.skills){
            this.skills.push(new Skill(skill)) 
        }
    }

    getEnergyGain(){
        return this.energyGain
    }

    setEnergyGain(energy){
        this.energyGain = energy
    }

    getHitPoints(){
        return this.hitPoints
    }

    setHitPoints(hp){
        this.hitPoints = hp
    }

    getType(){
        return this.type
    }

    setType(type){
        this.type = type
    } 
}