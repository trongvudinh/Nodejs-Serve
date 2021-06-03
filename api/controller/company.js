const log = require('../FuncLib/FuncLog');
const val_Const = require('../const/index');
const mongoose = require('mongoose');

const Company = require('../models/company');
const Menu = require('../models/menu');
const Catalog = require('../models/catalog');

exports.GetAllCompany = (req, res, next) => {
    try {
        Company.find({status:0}).populate('user_creat',val_Const.select.SELECT_USER).then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(500).json({ error: err });
            log.LogError(err, req, res);
        })
    } catch (error) {
        res.status(500).json({ error: error });
        log.LogError(error, req, res)
    }
}

//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================

exports.CreatNewCompany = (req, res, next) => {
    try {
        const i= new mongoose.Types.ObjectId();
        const company = new Company({
            _id:i,
            id: i,
            name: req.body.name,
            name_re : req.body.name,
            urlavatar : '',
            countMov : 0,
            user_creat : req.body.user_creat,
            user_update : req.body.user_creat,
            creattime: new Date(),
            updatetime: new Date(),
            status: 0
        })
        company.save().then(data=>{
            res.status(200).json({Company : data});
        }).catch(err=>{
            res.status(500).json({ error: err });
            log.LogError(err, req, res);
        });
            
    } 
    catch (error) {
        res.status(500).json({ error: error });
        log.LogError(error, req, res)
    }
}

exports.UpdateCompany = (req, res, next) => {
    try {
        var update ={};
        if (req.body.name) update = { ...update, name: req.body.name };
        if (req.body.birtday) update = { ...update, birtday: req.body.birtday };
        if (req.body.content) update = { ...update, content: req.body.content };
        if (req.body.famail) update = { ...update, famail: req.body.famail };
        if (req.body.type) update = { ...update, type: req.body.type };

        Company.updateOne({_id:req.params.id},update).then(data2=>{
            res.status(200).json({});
        }).catch(err=>{
            res.status(500).json({ message: err.message });
            log.LogError(err, req, res);
        })
            
    } catch (error) {
        res.status(500).json({ error: error });
        log.LogError(error, req, res)
    }
}

exports.DeleteCompany = (req, res, next) => {
    try {
        Company.updateOne({_id:req.params.id},{status:1}).then(data2=>{
            res.status(200).json({});
        }).catch(err=>{
            res.status(500).json({ message: err.message });
            log.LogError(err, req, res);
        });
    } catch (error) {
        res.status(500).json({ error: error });
        log.LogError(error, req, res)
    }
}