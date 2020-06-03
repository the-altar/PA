// set up mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArenaSchema = Schema({
    users:[{type: Schema.Types.ObjectId, ref: "User" }],
    characters:[{type: Schema.Types.Mixed}]
})

module.exports = mongoose.model("Arena", ArenaSchema)