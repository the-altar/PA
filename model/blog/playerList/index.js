// set up mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerListSchema = Schema({
    inGame: {type: Boolean, default: false},
    user: { type: Schema.Types.ObjectId, unique: true, ref: "User" },
    socketId: {type: String},
    team: [{
        type: Schema.Types.ObjectId,
        ref: "Character"
    }]
})

module.exports = mongoose.model('PlayerList', PlayerListSchema);
