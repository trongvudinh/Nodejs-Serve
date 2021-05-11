const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id: { type: mongoose.Schema.Types.ObjectId, require: true },
    name: { type: String, require: true },
    name_re: String,
    name_en: String,
    urlavatar: String,
    abc: {},//{type:0 ,val :"/Catalog"} Link== type:0 mac dinh 1 custom link
    type: {},
    id_menu: { type :mongoose.Schema.Types.ObjectId , ref: "Menu"},
    user_creat : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime:Date,
    updatetime:Date,
    status: { type: Number, require: true , default:0 } // 0:ok ,1 denied
})
module.exports = mongoose.model('Catalog', userSchema, 'T_CATALOG');