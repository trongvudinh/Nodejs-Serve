const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id: { type: mongoose.Schema.Types.ObjectId, require: true },
    user : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    movie : { type :mongoose.Schema.Types.ObjectId , ref: "Movie"},
    creattime : {type : Date ,require :true},
    updatetime :  Date,
    status : {type : Number ,require :true ,default : 0}//0:ok 1:not
})
module.exports = mongoose.model('User_playback_time', userSchema, 'T_USER_PLAYBACK_TIME');