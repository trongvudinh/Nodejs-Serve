const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id : Number,
    name : String,
    list_img : [],
})
module.exports = mongoose.model('DefaultImg', userSchema, 'T_DEFAULT_IMG');