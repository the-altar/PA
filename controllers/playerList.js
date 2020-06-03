const PlayerListDB = require('../model').PlayeriList


exports.SaveNewPlayer = function (e) {
    return PlayerListDB.create(e)
}

exports.CleanAllRecords = function(){
    PlayerListDB.deleteMany({})
        .then(()=> {console.log("Records deleted")})
        .catch(err=> console.log(err))
}

exports.RemovePlayer = function(playerID) {
    return PlayerListDB.deleteOne({_id: playerID}).exec()
} 

exports.GetAllPlayers = function(){
    return PlayerListDB.find({inGame: false}).populate('user').populate('team').exec()
}

exports.UpdateIngameStatus = function(playerIDs, status){
    return PlayerListDB.updateMany({_id: {$in:playerIDs}}, {inGame:true}).exec()
}