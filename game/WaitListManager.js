const PlayerListController = require('../controllers/playerList');

class WaitListManager {
    constructor() { 
        this.MatchMakeTimer = null
    }

    RemovePlayer(id) {
        PlayerListController.RemovePlayer(id)
            .then(() => { console.log(`${id} was removed!`) })
            .catch(err => { console.log(err) })
    }

    addNewPlayer(player, callback) {
        PlayerListController.SaveNewPlayer(player)
            .then(savedDoc => {
                callback(savedDoc, null)
            })
            .catch(err => {
                callback(null, err)
            })
    }
}

module.exports = new WaitListManager()