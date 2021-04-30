const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id : mongoose.Schema.Types.ObjectId,
    name : String,
    name_re : String,
    name_en : String,
    list_catalog:[{type:mongoose.Schema.Types.ObjectId , ref="Catalog"}],
    usercreat : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    userupdate : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime:Date,
    updatetime:Date,
    show:Number,//0:show 1:not
    abc:{},//link:{id :0 ,val:""}
    location:Number,
    lst_child:[],
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('Menu', userSchema, 'T_MENU');