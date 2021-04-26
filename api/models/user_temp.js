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
    lst_commentdislike:[{ type :mongoose.Schema.Types.ObjectId , ref: "Comment"}],
    status: { type: Number, require: true , default:0 } // 0:ok ,1 denied
});
module.exports = mongoose.model('UserTemp', userSchema, 'T_USER_TEMP');