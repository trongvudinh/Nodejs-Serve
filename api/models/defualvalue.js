const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id : Number,
    name : String,
    val : [],
})
module.exports = mongoose.model('DefaultValue', userSchema, 'T_DEFAULT_VALUE');