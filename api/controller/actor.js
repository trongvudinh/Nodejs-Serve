const log = require('../FuncLib/FuncLog');
const val_Const = require('../const/index');
const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Menu = require('../models/menu');
const Catalog = require('../models/catalog');

exports.GetAllActor = (req, res, next) => {
    try {
        Actor.find().populate('user_creat',val_Const.select.SELECT_USER).then(data => {
            console.log(data);
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
        console.log(req.body)
        Actor.find({name:req.body.name}).then(data=>{
            if (data.length > 0){
                return res.status(500).json({message:"Tên diễn viên đã tồn tại"});
            }else{
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
        })
    } 
    catch (error) {
        res.status(500).json({ error: error });
        log.LogError(error, req, res)
    }
}

exports.UpdateActor = (req, res, next) => {
    try {
        Tag.find({name:req.body.name}).then(data=>{
            if (data.length > 0){
                return res.status(500).json({message:"Tên thẻ đã tồn tại"});
            }else{
                Tag.updateOne({_id:req.body.id},{name:req.body.name}).then(data2=>{
                    res.status(200).json({});
                }).catch(err=>{
                    res.status(500).json({ message: err.message });
                    log.LogError(err, req, res);
                })
            }
        }).catch(err=>{
            res.status(500).json({ error: err });
            log.LogError(err, req, res);
        });
    } catch (error) {
        res.status(500).json({ error: error });
        log.LogError(error, req, res)
    }
}

exports.DeleteActor = (req, res, next) => {
    try {
        Tag.remove({_id:req.body.id}).then(data2=>{
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