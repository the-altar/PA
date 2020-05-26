const charDB = require("../../model").Character
const User = require('../../model').User

module.exports = function(client){
    client.on('REQUEST_ROSTER', function(){
        charDB.find({}, function(err, docs){
            if(err){
                console.log("something went wrong")
                return
            }
            client.emit("sent_roster", docs)
        })
    })

    client.on("REQUEST_LOGIN", function(payload){
        User.findOne({userName: payload.userName}, function(err, doc){
            if(err){
                client.emit("REPLY_LOGIN", false)
                return
            }

            client.emit("REPLY_LOGIN", doc)
        }) 
    })
}
