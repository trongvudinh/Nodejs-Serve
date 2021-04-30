const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime:Date,
    updatetime:Date,
    noti_notseen: {type : Number, default : 0 },
    app_notseen:  {type : Number, default : 0 },
    list_UpdateNotiTime: [],
    list_UpdateNotiVal: [],
    list_UpdateAppTime: [],
    list_UpdateAppVal: [],
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('NotiNotSeen', userSchema, 'T_NOTI_NOTSEEN');