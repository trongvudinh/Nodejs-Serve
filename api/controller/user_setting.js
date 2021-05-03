const User = require('./../models/user');
const log = require('./../FuncLib/FuncLog');
const val_Const = require('./../const/index');
const mongoose= require('mongoose');
const UserSetting = require('./../models/user_setting');

exports.getusersetting = (req, res, next)=>{
    try {
        UserSetting.find({user : req.jwtDecoded.data.id }).then(data=>{    
            res.status(200).json({ Setting : data[0] });
            log.LogInfo(req.originalUrl);
        }).catch(err =>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}