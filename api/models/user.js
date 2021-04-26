const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id: { type: mongoose.Schema.Types.ObjectId, require: true },
    name: { type: String, require: true },
    birtday: Date,
    urlavatar: String,
    famail: {},//{val:0,name:Nu}
    type: {},//{val:0,name:dien vien}
    britday: Date,

    creattime:Date,
    user_creat:[{ id :mongoose.Schema.Types.ObjectId , ref: "User"}],
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
module.exports = mongoose.model('Actor', userSchema, 'T_ACTOR');