const log = require('./../FuncLib/FuncLog');
const val_Const = require('./../const/index');
const mongoose= require('mongoose');

const lstRepost = require('./../models/lst_report');
const Menu = require('./../models/menu');

exports.GetAllMenu = (req, res, next)=>{
    try {
        Menu.find().then(data=>{
            res.status(200).json(data);
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
        
    } catch (error) {
        log.LogError(error, req, res)
    }
}