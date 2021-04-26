const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user: { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    totalvalue: Number,
    creattime : Date,
})
module.exports = mongoose.model('UserFile', userSchema, 'T_USER_FILE');
