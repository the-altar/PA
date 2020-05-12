const charDB = require('../model/index').Character

module.exports = function (server) {
    const io = require('socket.io')(server)
    io.on('connection', client => {
        
        client.on('REQUEST_ROSTER', function(){
            charDB.find({}, function(err, docs){
                if(err){
                    console.log("something went wrong")
                    return
                }
                client.emit("sent_roster", docs)
            })
        })
    })
}