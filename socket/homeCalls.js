module.exports = function (socket, CharModel, GM) {

    socket.on('startGame', function (user) {
        if (GM.isConnected(user)) return
        socket.user = user.id
        GM.addToPlayerList(user, socket)
        GM.matchMake()
    })

    socket.on("disconnect", function () {
        GM.removeFromPlayerList(socket.user)
    })

    socket.on("myCharacters", function () {

        CharModel.find({}, function (err, docs) {
            if (err) {
                socket.emit('charError', "something went wrong!")
                return
            }
            socket.emit("yourCharacters", docs)
        })
    })

    socket.on("endTurn", function(instructions){

        const passive = GM.inGamePlayer[GM.inGamePlayer[socket.user].opponent]
        const active = GM.inGamePlayer[socket.user]
        const executioners  = active.executeInstructions(instructions)
        
        active.clearCooldown(executioners)
        active.replenishEnergy(executioners)
        active.removeEmptyEffects()
        
        clearTimeout(active.timeOut)

        active.myturn = false
        passive.myturn = true

        active.connection.emit("endTurn", active.getGameStatus())
        passive.connection.emit("startTurn", passive.getGameStatus())

        passive.startCountDown(active)
    })
}