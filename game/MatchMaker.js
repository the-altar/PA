const PlayerListController = require('../controllers/playerList');

class MatchMaker {
    constructor() {
        this.counter = 0
        this.isBusy = false
        this.Timer = null
    }

    StartMatchMaking(callback) {
        if (this.isBusy) {
            console.log("Worker is busy")
            return
        }
    }

    MatchMake(players, callback) {
    }
}

module.exports = new MatchMaker()