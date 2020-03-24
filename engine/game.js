const Character = require('./roster/character')

module.exports = class PlayerGame {
    constructor(characters){
        this.team = []
        for(const i in characters){
            this.team.push(new Character(characters[i]))
        }
    } 
}