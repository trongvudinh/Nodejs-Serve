const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    type_room : Number, //0 -chat friend  1-chatroom
    userInRoom : [{ type :mongoose.Schema.Types.ObjectId , ref: "User"}],
    Admin : [{ type :mongoose.Schema.Types.ObjectId , ref: "User"}],
    user_creat : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime:Date,
    lastMess:Date,
    status: { type: Number, require: true , default:0 } // 0:ok ,1 denied
})
module.exports = mongoose.model('ChatRoom', userSchema, 'T_CHATROOM');