const log = require('../FuncLib/FuncLog');
const val_Const = require('../const/index');
const mongoose = require('mongoose');

const Tag = require('../models/tag');
const Menu = require('../models/menu');
const Catalog = require('../models/catalog');

exports.GetAllTag = (req, res, next) => {
    try {
        Tag.find().populate('user_creat',val_Const.select.SELECT_USER).then(data => {
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

exports.CreatNewTag = (req, res, next) => {
    try {
        Tag.find({name:req.body.name}).then(data=>{
            if (data.length > 0){
                return res.status(500).json({message:"Tên thẻ đã tồn tại"});
            }else{
                const i= new mongoose.Types.ObjectId();
                const tag = new Tag({
                    _id: i,
                    id: i,
                    name: req.body.name,
                    name_re: req.body.name,
                    sl_movie: 0,
                    creattime: new Date(),
                    user_creat:req.body.usercreat,
                    updatetime: new Date(),
                })
                tag.save().then(data=>{
                    res.status(200).json(data);
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

exports.UpdateTag = (req, res, next) => {
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

exports.DeleteTag = (req, res, next) => {
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