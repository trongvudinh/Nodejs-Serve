const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id: { type: mongoose.Schema.Types.ObjectId, require: true },
    hexcode : String,
    htmlcode : String,
    codepoint : String,
    nameEmoj :  String,
    group : {},
    subgroup:{},
    creattime:Date,
    usercreat: { type:mongoose.Schema.Types.ObjectId , ref:"User"},
    status: { type: Number, require: true , default:0 } // 0:ok ,1 denied
})
module.exports = mongoose.model('Emoji', userSchema, 'T_EMOJI');