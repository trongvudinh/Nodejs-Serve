const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : Number,
    refreshtoken : String,
    folder:[],
    token : String,
    totalvalue:Number,
    creattime:Date,
})
module.exports = mongoose.model('DriveRefreshToken', userSchema, 'T_DRIVE_REFRESH_TOKEN');