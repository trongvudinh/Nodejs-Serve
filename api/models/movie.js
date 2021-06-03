const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id : mongoose.Schema.Types.ObjectId,
    name : String,
    name_re : String,
    name_en : String,
    n_view : Number,
    n_like:Number,
    n_dislike : Number,
    n_like2 : Number,
    n_dislike2 : Number,
    year_movie : Number,
    time_thoiluong : Number,
    warning : Number ,
    content:String,
    content_re :String,
    urlavatar:String,
    type_mov : Number ,//0:public 1:private
    user_creat : { type :mongoose.Schema.Types.ObjectId , ref: "User"},
    creattime:Date,
    user_update  : {type :String ,ref :"User"},
    updatetime:Date,
    series:{ type :String , ref: "Series"},
    list_actor:[{ type :mongoose.Schema.Types.ObjectId , ref: "Actor"}],
    list_tag:[{ type :mongoose.Schema.Types.ObjectId , ref: "Tag"}],
    list_cata:[{ type :mongoose.Schema.Types.ObjectId , ref: "Catalog"}],
    serve:[{
        url:String,
        list_quality:[]
    }],
    status:{ type: Number, require: true , default:0 } // 0:ok ,1 denied

})
module.exports = mongoose.model('Movie', userSchema, 'T_MOVIE');