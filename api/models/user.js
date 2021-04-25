const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id: { type: mongoose.Schema.Types.ObjectId, require: true },
    username: { type: String, require: true },
    // pass: { type: String, require: true },
    // level: { type: Number, require: true },
    // urlavatar: String,
    // background: String,
    // email: String,
    // britday: Date,
    // thanhpho: {},
    // diachi: String,
    // hoten: String,
    // gioitinh: Number,//0:nam ,1:nu
    // sdt: String,
    // nghenghiep: String,
    // sothich:String,
    // creattime:Date,
    lst_friend:[{ type :mongoose.Schema.Types.ObjectId , ref: "User"}],
    list2:[{ type :mongoose.Schema.Types.ObjectId , ref: "User"}],

})
module.exports = mongoose.model('User', userSchema, 'T_USER');