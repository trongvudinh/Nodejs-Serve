const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : String,
    user : mongoose.Schema.Types.ObjectId,
    location:String,
    fileid : String,
    fieldname:String,
    creattime:Date,
})
module.exports = mongoose.model('DriveFile', userSchema, 'T_DRIVE_FILE');