const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    name_re: String,
    sl_movie: Number,
    creattime: Date,
    user_creat:{ type :mongoose.Schema.Types.ObjectId , ref: "User"},
    updatetime: Date,
})
module.exports = mongoose.model('Tag', userSchema, 'T_TAG');