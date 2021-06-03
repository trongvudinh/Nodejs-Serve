const log = require('../FuncLib/FuncLog');
const val_Const = require('../const/index');
const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Menu = require('../models/menu');
const Catalog = require('../models/catalog');

exports.GetAllActor = (req, res, next) => {
    try {
        Actor.find({status:0}).populate('user_creat',val_Const.select.SELECT_USER).then(data => {
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

exports.CreatNewActor = (req, res, next) => {
    try {
            const i= new mongoose.Types.ObjectId();
            const actor = new Actor({
                _id:i,
                id: i,
                name: req.body.name,
                famail: req.body.famail,
                urlavatar: '',
                content: req.body.content,
                type: req.body.type,
                birtday: new Date(req.body.birtday),
                countMov:0,
                user_creat : req.body.user_creat,
                creattime: new Date(),
                updatetime: new Date(),
                status: 0
            })
            actor.save().then(data=>{
                res.status(200).json({Actor : data});
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

exports.UpdateActor = (req, res, next) => {
    try {
        var update ={};
        if (req.body.name) update = { ...update, name: req.body.name };
        if (req.body.birtday) update = { ...update, birtday: req.body.birtday };
        if (req.body.content) update = { ...update, content: req.body.content };
        if (req.body.famail) update = { ...update, famail: req.body.famail };
        if (req.body.type) update = { ...update, type: req.body.type };
        if (req.body.countMov) update = { ...update, countMov: req.body.countMov };

        Actor.updateOne({_id:req.params.id},update).then(data2=>{
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

exports.DeleteActor = (req, res, next) => {
    try {
        Actor.updateOne({_id:req.params.id},{status:1}).then(data2=>{
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