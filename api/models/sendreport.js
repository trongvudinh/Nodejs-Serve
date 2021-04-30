const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id : mongoose.Schema.Types.ObjectId,
    usercreat : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    userupdate : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    action:[{
        table_name:String,
        fieldname:String,
        keyid:Number,
        value:{},
        method:String,//method cua bang insert,update,delete
        fieldmethod:String//method cua field
    }],
    type_report:{},//{id:0 , name:"Report Movie"}
    object_report:{
        key:{},//{id:}
        table_name:String,
    },
    report_value:{
        reportvalue:Number,
        reportname:String,
        reportchild:{}
    },
    //0:report Movie
    type_usercreat : Number,//0:user 1 admin
    creattime:Date,
    updatetime:Date,
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('SendReport', userSchema, 'T_SEND_REPORT');