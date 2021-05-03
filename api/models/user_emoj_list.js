const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user: { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime : Date,
    val:{},
    status :Number //0:ok 1 not
})
module.exports = mongoose.model('UserEmojiList', userSchema, 'T_USER_EMOJI_LIST');