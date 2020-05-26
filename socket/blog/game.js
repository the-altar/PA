const WaitList = require('../../game/WaitListManager');
const MatchMaker = require('../../game/MatchMaker'); 
const Arena = require('../../game/Arena');

module.exports = function (client) {

    client.on('disconnect', function () {
        if(client.playerID !== undefined)
            WaitList.RemovePlayer(client.playerID)
    })

    client.on('GAME_START', e => {
        WaitList.addNewPlayer(e, (doc, err) => {
            if (err) {
                client.emit("REPLY_GAME_START", {
                    success: false,
                    errcode: 0,
                    errmsg: "User already connected",
                    status: 1,
                })
                return
            }

            client.playerID = doc._id
            client.emit("REPLY_GAME_START", {
                success: true, pid: doc._id,
                status: 0,
            })

            MatchMaker.StartMatchMaking(Arena.BuildArena)
        })
    })
}