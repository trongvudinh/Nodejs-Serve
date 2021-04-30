const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    icon:[],
    listImg:[],
    primary:Number,
    content:String,
    onChat:Number,
    like:Number,
    dislike:Number,

    usercreat : { type :mongoose.Schema.Types.ObjectId , ref: "User"},

    creattime:Date,
    updatetime:Date,
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('PostBlog', userSchema, 'T_POST_BLOG');