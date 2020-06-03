const ArenaDB = require("../model").Arena

exports.create = function(data){
    return ArenaDB.create(data)
        .then(docs => {
            return docs
        })
        .catch(err=>{
            console.log(err)
            return false
        })
}