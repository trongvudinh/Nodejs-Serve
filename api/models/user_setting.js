const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user: { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime : Date,
    autoshowchat :{type : Number , default : 0}, //0 auto 1 not
    status :Number //0:ok 1 not
})
module.exports = mongoose.model('UserSetting', userSchema, 'T_USER_SETTING');