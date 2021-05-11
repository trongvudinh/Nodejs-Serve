const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : String,
    folder : [],
    creattime:Date,
})
module.exports = mongoose.model('DriveFolder', userSchema, 'T_DRIVE_FOLDER');