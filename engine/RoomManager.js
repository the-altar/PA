const GameRoom = require('./GameRoom');

module.exports = class GameManager {
    constructor(playerId) {
        this.playerList = {}
        this.isBusy = false
        this.inGamePlayer = {}
    }

    isConnected(user) {
        const u = this.playerList[user]
        if (u !== undefined) {
            if (u.connected === true) {
                console.log(`${user} already connected!`)
                return true
            }
        }
        return false
    }

    addToPlayerList(player, socket) {
        this.playerList[player.id] = {
            id: player.id,
            connected: true,
            characters: player.characters,
            connection: socket
        }
        console.log(`${player.id} added to player list`)
    }

    removeFromPlayerList(user) {
        if (this.playerList[user] === undefined) return

        delete this.playerList[user]
        delete this.inGamePlayer[user]
        console.log(`${user} removed from player list`)
    }

    matchMake() {
        if (this.isBusy !== false) return

        this.isBusy = setInterval(function (that) {
            const players = Object.keys(that.playerList)

            if (players.length > 1) {
                const p1 = players.pop()
                const p2 = players.pop()
                that.inGamePlayer[p1] = new GameRoom(that.playerList[p1], that.playerList[p2], true)
                that.inGamePlayer[p2] = new GameRoom(that.playerList[p2], that.playerList[p1], false)

                that.inGamePlayer[p1].enemyTeam = that.inGamePlayer[p2].team
                that.inGamePlayer[p2].enemyTeam = that.inGamePlayer[p1].team

                that.inGamePlayer[p2].connection.emit("startGame", that.inGamePlayer[p2].getGameStatus())
                that.inGamePlayer[p1].connection.emit("startGame", that.inGamePlayer[p1].getGameStatus())
                that.inGamePlayer[p1].startCountDown(that.inGamePlayer[p2])
            }
            if (players.length === 0) {
                clearInterval(that.isBusy)
                that.isBusy = false
            }
        }, 1000, this)
    }
}