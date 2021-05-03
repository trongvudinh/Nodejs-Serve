const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id: { type: mongoose.Schema.Types.ObjectId, require: true },
    user: { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    backgroundAvatar: {type : String ,default : ""},
    list_emoj: [{ type: mongoose.Schema.Types.ObjectId, ref: "Emoji" }],
    list_messCheckPoint: [{ id :{type : mongoose.Schema.Types.ObjectId,  ref: "Comment" } ,
        room : {type :mongoose.Schema.Types.ObjectId, ref : "ChatRoom"},
        content:{},
    }],
    list_blockuser: [{id : {type : mongoose.Schema.Types.ObjectId , ref : "User"} , creattime : Date}],
    libraryImg: [],
    status: { type: Number, require: true , default:0 } // 0:ok ,1 denied
})

module.exports = mongoose.model('UserActive', userSchema, 'T_USER_ACTIVE');