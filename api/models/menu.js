const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id : mongoose.Schema.Types.ObjectId,
    type_report : Number,
    name : String,
    user : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime:Date,
    location:Number,
    lst_child:[],
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('LstReport', userSchema, 'T_LST_REPORT');