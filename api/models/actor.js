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
    lst_friend:[{ id :mongoose.Schema.Types.ObjectId , creattime: Date}],
    lst_movie_playback:[{ id :mongoose.Schema.Types.ObjectId , creattime: Date}],
    lst_movie_favorite:[{ id :mongoose.Schema.Types.ObjectId , creattime: Date}],
    lst_movie_like:[{ id :mongoose.Schema.Types.ObjectId , creattime: Date}],
    lst_movie_dislike:[{ id :mongoose.Schema.Types.ObjectId , creattime: Date}],
    lst_follow:[{ id :mongoose.Schema.Types.ObjectId , creattime: Date}],
    lst_commentlike:[{ id :mongoose.Schema.Types.ObjectId , creattime: Date}],
    lst_commentdislike:[{ id :mongoose.Schema.Types.ObjectId , creattime: Date}],
    status: { type: Number, require: true , default:0 } // 0:ok ,1 denied
})

userSchema.virtual('vir_Friend', {
    ref: 'User',
    localField: 'lst_friend.id',
    foreignField: 'id',
    justOne: false,
});
userSchema.virtual('vir_MoviePlayBack', {
    ref: 'Movie',
    localField: 'lst_movie_playback.id',
    foreignField: 'id',
    justOne: false,
});
userSchema.virtual('vir_MovieFavorite', {
    ref: 'Movie',
    localField: 'lst_movie_favorite.id',
    foreignField: 'id',
    justOne: false,
});
userSchema.virtual('vir_MovieLike', {
    ref: 'Movie',
    localField: 'lst_movie_like.id',
    foreignField: 'id',
    justOne: false,
});
userSchema.virtual('vir_MovieDisLike', {
    ref: 'Movie',
    localField: 'lst_movie_dislike.id',
    foreignField: 'id',
    justOne: false,
});
userSchema.virtual('vir_Follow', {
    ref: 'User',
    localField: 'lst_follow.id',
    foreignField: 'id',
    justOne: false,
});
userSchema.virtual('vir_CommentLike', {
    ref: 'Comment',
    localField: 'lst_commentlike.id',
    foreignField: 'id',
    justOne: false,
});
userSchema.virtual('vir_CommentDisLike', {
    ref: 'Comment',
    localField: 'lst_commentdislike.id',
    foreignField: 'id',
    justOne: false,
});
module.exports = mongoose.model('User', userSchema, 'T_USER');