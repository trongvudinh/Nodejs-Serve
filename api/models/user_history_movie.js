const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    type_user : Number,
    movie : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime:Date,
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('UserHistoryMovie', userSchema, 'T_USER_HISTORY_MOVIE');