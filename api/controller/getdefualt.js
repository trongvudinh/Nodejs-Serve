const User = require('./../models/user');
const log = require('./../FuncLib/FuncLog');
const jwtHellper = require('./../FuncLib/token');
const val_Const = require('./../const/index');
const mongoose= require('mongoose');

const lstRepost = require('./../models/lst_report');
const Default_Img = require('./../models/Default_Img');
const Emoji = require('./../models/emoji');
const UserHistoryFindUser = require('./../models/user_history_find');


exports.listReport = (req, res, next)=>{
    try {
        lstRepost.find().then(data=>{
            res.status(200).json({ list_report : data});
            log.LogInfo(req.originalUrl);
        }).catch(err=>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}

exports.get_lst_bieucamimg = (req, res, next)=>{
    try {
        Default_Img.find({id : 1}).then(data=>{
            res.status(200).json({ list_bieucamimg : data});
            log.LogInfo(req.originalUrl);
        }).catch(err=>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}
exports.Getemoj = (req, res, next)=>{
    try {
        Emoji.find().then(data=>{
            res.status(200).json({ Emoj : data});
            log.LogInfo(req.originalUrl);
        }).catch(err=>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}

//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================

exports.GetHistoryFindUser = (req, res, next)=>{
    try {
        UserHistoryFindUser.find({user : req.jwtDecode.data.id}).populate('user',val_Const.select.SELECT_USER).then(data=>{
            const re = data.map(d=>{
                return {val:d.finduser , creattime:d.creattime}
            })
            res.status(200).json({ findHistory : re});
            log.LogInfo(req.originalUrl);
        }).catch(err=>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}