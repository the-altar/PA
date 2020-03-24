const Skill = require('./skills')

module.exports = class Character {
    constructor(character){
        this.health = character.health
        this.energy = character.energy
        this.name = character.name

        this.skills = []
        for(const skill in character.skills){
            this.skills.push(new Skill(character.skills[skill]))
        }
    }
}


