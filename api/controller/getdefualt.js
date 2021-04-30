const User = require('./../models/user');
const log = require('./../FuncLib/FuncLog');
const jwtHellper = require('./../FuncLib/token');
const val_Const = require('./../const/index');

const lstRepost = require('./../models/lst_report');
const Default_Img = require('./../models/Default_Img');
const mongoose= require('mongoose');


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