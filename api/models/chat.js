const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    message:{
        usercreat : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
        disableuser : [{ type :mongoose.Schema.Types.ObjectId , ref: "User"}],
        list_bieucam:[],
        list_userseen:[{ type :mongoose.Schema.Types.ObjectId , ref: "User"}],
        creattime:Date,
        content:String,
        status:Number,// 0:ok ,1 denied
        start:Number,//0:start chat, 1:no
        type_mess:Number,// 0:text ,1..:img
    },
    room:{
        id:Number,//typeroom : -1:chat_user
        name:String,
        type_room:Number,//0:chat user ,1:room
    }
})
module.exports = mongoose.model('Chat', userSchema, 'T_CHAT');