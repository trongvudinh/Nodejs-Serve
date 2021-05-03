const UserActive = require('./../models/user_active');
const log = require('./../FuncLib/FuncLog');
const val_Const = require('./../const/index');
const mongoose= require('mongoose');

//=============================================GET=========================================================
//=============================================GET=========================================================
//=============================================GET=========================================================
//=============================================GET=========================================================
//=============================================GET=========================================================

exports.getMess_CheckPonit = (req, res, next)=>{
    try {
        UserActive.find({user : req.jwtDecoded.data.id }).select('list_messCheckPoint')
        .populate('list_messCheckPoint.id')
        .populate('list_messCheckPoint.room')
        .sort({creattime : -1}).then(data=>{    
            res.status(200).json({ HistoryEmoj : data[0] });
            log.LogInfo(req.originalUrl);
        }).catch(err =>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}

exports.getlistBlockUser = (req, res, next)=>{
    try {
        UserActive.find({user : req.jwtDecoded.data.id }).select('list_blockuser')
        .populate('list_blockuser.id')
        .sort({creattime : -1}).then(data=>{    
            res.status(200).json({ ListBlockUser : data[0]});
            log.LogInfo(req.originalUrl);
        }).catch(err =>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}

exports.GetListUserBlockMe = (req, res, next)=>{
    try {
        UserActive.find({"list_blockuser.id" : req.jwtDecoded.data.id })
        .select('user')
        .populate('user',val_Const.select.SELECT_USER).then(data=>{    
            res.status(200).json({ ListBlockUser : data });
            log.LogInfo(req.originalUrl);
        }).catch(err =>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}