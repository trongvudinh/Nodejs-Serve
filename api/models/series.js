const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    name_re: String,
    count_movie: String,
    urlavatar: String,
    year_str: Number,
    year_end: Number,
    content: String,
    content_re: String,
    warning: Number,
    private: Number,
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    list_actor : [{ type :mongoose.Schema.Types.ObjectId , ref: "Actor"} ],
    list_cata : [{ type :mongoose.Schema.Types.ObjectId , ref: "Catalog"} ],
    list_tag : [{ type :mongoose.Schema.Types.ObjectId , ref: "Tag"} ],
    creattime : Date,
    usercreat : { type :mongoose.Schema.Types.ObjectId , ref: "User"} ,
    status:{ type: Number, require: true , default:0 }, // 0:ok ,1 denied
    updatetime : Date,
})
module.exports = mongoose.model('Series', userSchema, 'T_SERIES');