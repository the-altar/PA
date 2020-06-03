const Character = require('../character')
const Player = require('../player')
const { v4: uuidv4 } = require('uuid');

class Arena {
    constructor(players) {
        this.users = []
        this.characters = []
        
        this.users.push(players[0].user._id)
        this.users.push(players[1].user._id)

        for (const p of players) {
            for (const t of p.team) this.characters.push(new Character(t, p.user._id))
        }
    }

    getData(){
        return {
            characters: this.characters,
            users: this.users
        }
    }
}

module.exports = Arena