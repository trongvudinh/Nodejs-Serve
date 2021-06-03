const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id:mongoose.Schema.Types.ObjectId,
    app_code:Number,
    //Loai app
    //0:add friend
    //1:phe duyet warning
    //2:phe duyet series
    name: { type: String, require: true },
    content:String,
    note:String,
    urlinfo:String,
    action:[{
        table_name:String,
        fieldname:String,
        keyid:Number,
        value:{}, //{type_val :'String' , val: ''}
        method:String,//method cua bang insert,update,delete
        fieldmethod:String//method cua field
    }],
    isto_admin:Number,//0:true ,1 not
    touser:{ type :String , ref: "User"},
    user_creat:{ type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime:Date,
    updatetime:Date,
    seen:Number,//0: not seen, 1 : seen
    disablenoti:Number,//0:not ,1:disable
    confirm_status :Number,//0:pending ,1 :ok,2:cancel
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('Approved', userSchema, 'T_APPROVED');