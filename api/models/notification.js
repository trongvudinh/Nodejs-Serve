const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    type_confirm : Number,//0:confrim, 1:not
    content : String,
    note : String,
    urlinfo : String,
    isto_admin:Number,//0:co, 1 khong
    touser : { type :mongoose.Schema.Types.ObjectId , ref: "User"},

    user_creat : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime:Date,
    updatetime:Date,
    type: Number,
    seen:Number , //0:not seen ,1 :seen
    disablenoti:Number,
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('Notification', userSchema, 'T_NOTIFICATION');