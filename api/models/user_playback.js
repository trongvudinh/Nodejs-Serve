const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user : { type :mongoose.Schema.Types.ObjectId , ref: "User"},

    list_movie : [{id:{ type :mongoose.Schema.Types.ObjectId , ref: "Movie"},creattime:Date}],
    creattime:Date,
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('UserPlayBack', userSchema, 'T_USER_PLAYBACK');