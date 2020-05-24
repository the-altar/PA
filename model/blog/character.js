// set up mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = Schema({
    "name": {
        "type": String
    },
    "banner": String,
    "releaseStatus":Boolean,
    "facepic": {
        "type": String
    },
    "type": {},
    "energyGain": [],
    "hitPoints": {
        "type": Number
    },
    "description": {
        "type": String
    },
    "skills": {
        "type": [
            Schema.Types.Mixed
        ]
    }
});

module.exports = mongoose.model('Character', CharacterSchema);
// the above is necessary as you might have embedded schemas which you don't export

