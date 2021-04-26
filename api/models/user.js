const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id: { type: mongoose.Schema.Types.ObjectId, require: true },
    username: { type: String, require: true },
    pass: { type: String, require: true },
    level: { type: Number, require: true , default:0 },
    urlavatar: String,
    background: String,
    email: String,
    britday: Date,
    thanhpho: {},
    diachi: String,
    hoten: String,
    gioitinh: Number,//0:nam ,1:nu
    sdt: String,
    nghenghiep: String,
    sothich:String,
    creattime:Date,
    lst_friend:[{ id : {type :mongoose.Schema.Types.ObjectId , ref :"User" }, creattime: Date}],
    lst_movie_playback:[{ id : {type :mongoose.Schema.Types.ObjectId , ref :"Movie" } , creattime: Date}],
    lst_movie_favorite:[{ id : {type :mongoose.Schema.Types.ObjectId , ref :"Movie" } , creattime: Date}],
    lst_movie_like:[{ id : {type :mongoose.Schema.Types.ObjectId , ref :"Movie" } , creattime: Date}],
    lst_movie_dislike:[{ id : {type :mongoose.Schema.Types.ObjectId , ref :"Movie" } , creattime: Date}],
    lst_follow:[{ id : {type :mongoose.Schema.Types.ObjectId , ref :"User" } , creattime: Date}],
    lst_commentlike:[{ id : {type :mongoose.Schema.Types.ObjectId , ref :"Comment" } , creattime: Date}],
    lst_commentdislike:[{ id : {type :mongoose.Schema.Types.ObjectId , ref :"Comment" }  , creattime: Date}],
    status: { type: Number, require: true , default:0 } // 0:ok ,1 denied
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})
module.exports = mongoose.model('User', userSchema, 'T_USER');