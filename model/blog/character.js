// set up mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = Schema({
    "name": {
        "type": String
    },
    "facepic": {
        "type": String
    },
    "energy": {
        "type": Number
    },
    "health": {
        "type": Number
    },
    "description": {
        "type": Number
    },
    "skills": {
        "type": [
            Schema.Types.Mixed
        ]
    }
});

module.exports = mongoose.model('Character', CharacterSchema);
// the above is necessary as you might have embedded schemas which you don't export

