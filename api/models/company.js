const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id : mongoose.Schema.Types.ObjectId,
    name : String,
    name_re : String,
    urlavatar : String,
    user_creat : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    user_update : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime:Date,
    updatetime:Date,
    content:String,
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('Company', userSchema, 'T_COMPANY');