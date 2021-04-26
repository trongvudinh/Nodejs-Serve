const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id: { type: mongoose.Schema.Types.ObjectId, require: true },
    username: { type: String, require: true },
    level: 0,
    urlavatar: String,
    hoten: String,
    creattime:Date,
    lst_movie_like:[{ type :mongoose.Schema.Types.ObjectId , ref: "Movie"}],
    lst_movie_dislike:[{ type :mongoose.Schema.Types.ObjectId , ref: "Movie"}],
    lst_commentlike:[{ type :mongoose.Schema.Types.ObjectId , ref: "Comment"}],
    lst_commentdislike:[{ type :mongoose.Schema.Types.ObjectId , ref: "comment"}],
    status: { type: Number, require: true , default:0 } // 0:ok ,1 denied
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
module.exports = mongoose.model('UserTemp', userSchema, 'T_USER_TEMP');