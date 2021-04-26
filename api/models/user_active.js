const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id: { type: mongoose.Schema.Types.ObjectId, require: true },
    user: { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    backgroundAvatar: String,
    list_emoj: [{ type: mongoose.Schema.Types.ObjectId, ref: "Emoji" }],
    list_messCheckPoint: [{ id :mongoose.Schema.Types.ObjectId, 
        room :mongoose.Schema.Types.ObjectId,
        content:{},
    }],
    list_blockuser: [{id : mongoose.Schema.Types.ObjectId , creattime : Date}],
    libraryImg: [],
    status: { type: Number, require: true , default:0 } // 0:ok ,1 denied
})

userSchema.virtual('vir_ListEmoj', {
    ref: 'Emoji',
    localField: 'list_emoj.id',
    foreignField: 'id',
    justOne: false,
});
userSchema.virtual('vir_MessCheckPoint_Comment', {
    ref: 'Comment',
    localField: 'list_messCheckPoint.id',
    foreignField: 'id',
    justOne: false,
});
userSchema.virtual('vir_MessCheckPoint_Room', {
    ref: 'Room',
    localField: 'list_messCheckPoint.room',
    foreignField: 'id',
    justOne: false,
});
userSchema.virtual('vir_BlockUser', {
    ref: 'User',
    localField: 'list_blockuser.id',
    foreignField: 'id',
    justOne: false,
});
module.exports = mongoose.model('UserActive', userSchema, 'T_USER_ACTIVE');