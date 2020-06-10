const Character = require('../character');
const Player = require('../player ');

class Arena {
    constructor() {
        this.whoseTurn = null
        this.turnCount = 0
        this.players = []
        this.characters = [],
        this.effectQueue = []
    }
    addPlayer(data) {
        const player = new Player(data.player)
        for (let char of data.characters) {
            this.characters.push(new Character(char, player.getId()))
        }
        this.players.push(player)
    }
    startGame() {
        const p1 = this.turnCount % 2
        let p2 = 0
        if(p1===0) p2 = 1 

        this.players[p1].setTurn(true)
        this.players[p2].setTurn(false)

        this.turnCount++
        return this.getData()
    }
    getData() {
        return {
            players: this.players,
            characters: this.characters
        }
    }
}

module.exports = Arena