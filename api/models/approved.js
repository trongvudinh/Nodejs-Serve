const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id:mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    content:String,
    note:String,
    urlinfo:String,
    action:[{
        table_name:String,
        fieldname:String,
        keyid:Number,
        value:{},
        method:String,//method cua bang insert,update,delete
        fieldmethod:String//method cua field
    }],
    touser:{ type :mongoose.Schema.Types.ObjectId , ref: "User"},
    user_creat:{ type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime:Date,
    updatetime:Date,
    type:Number,
    //Loai app
    //0:phe duyet warning
    //1:add friend
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('Approved', userSchema, 'T_APPROVED');