const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id: { type: mongoose.Schema.Types.ObjectId, require: true },
    name: { type: String, require: true },
    famail: {},//{val:0,type:}
    urlavatar: String,
    content: String,
    type: {},
    birtday: Date,
    user_creat : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime:Date,
    updatetime:Date,
    status: { type: Number, require: true , default:0 } // 0:ok ,1 denied
})
module.exports = mongoose.model('Actor', userSchema, 'T_ACTOR');