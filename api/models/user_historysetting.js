const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user: { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    oldvalue:{},
    newvalue:{},
    creattime : Date,
    status :Number //0:ok 1 not
})
module.exports = mongoose.model('UserHistorySetting', userSchema, 'T_USER_HISTORYSETTING');