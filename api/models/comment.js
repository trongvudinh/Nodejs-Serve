const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    usercreat : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    movie : { type :mongoose.Schema.Types.ObjectId , ref: "Movie"},
    cmt_parent:{ type :mongoose.Schema.Types.ObjectId , ref: "Comment"},
    content:String,
    level:Number,
    has_child:Number,//0:co ,1 not
    n_like:Number,
    n_dislike:Number,
    n_like2:Number,
    n_dislike2:Number,
    lockontop:Number,//to top comment
    content:String,
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('Comment', userSchema, 'T_COMMENT');