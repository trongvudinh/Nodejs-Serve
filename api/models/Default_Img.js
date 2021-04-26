const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id : mongoose.Schema.Types.ObjectId,
    name : String,
    list_img : [],
})
module.exports = mongoose.model('DefaultImg', userSchema, 'T_DEFAULT_IMG');