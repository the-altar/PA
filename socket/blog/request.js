const charDB = require("../../model").Character

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
}
