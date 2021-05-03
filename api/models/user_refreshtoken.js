const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	user : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
	type : Number,//0:user , 1 : khach
	refreshtoken : String,
	creattime : Date,
})
module.exports = mongoose.model('UserRefreshToken', userSchema, 'T_USER_REFRESHTOKEN');