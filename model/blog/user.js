const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = Schema({
    userName: String,
    passWord: String,
    memberRank: String,
    isRegistered: Boolean
})

module.exports = mongoose.model('User', UserSchema);
