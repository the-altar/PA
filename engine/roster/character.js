const Skill = require('./skills')
const uniqid = require('uniqid');

module.exports = class Character {
    constructor(character){
        this.id = uniqid()
        this.health = character.hitPoints
        this.energy = character.skillPoints
        this.name = character.name
        this.description = character.description
        this.facepic = character.facepic
        this.skills = []
        for(const skill in character.skills){
            this.skills.push(new Skill(character.skills[skill]))
        }
    }
}


