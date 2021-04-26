const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user: { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    val: Number,
    creattime : Date,
})
module.exports = mongoose.model('UserHistoryFile', userSchema, 'T_USER_HISTORYFILE');