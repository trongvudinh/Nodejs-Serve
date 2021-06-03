const log = require('../FuncLib/FuncLog');
const val_Const = require('../const/index');
const mongoose = require('mongoose');

const Series = require('../models/series');
const Menu = require('../models/menu');
const Catalog = require('../models/catalog');

exports.GetAllSeries = (req, res, next) => {
    try {
        Series.find({status:0})
        .populate('usercreat',val_Const.select.SELECT_USER)
         //.populate('company')
        // .populate('list_actor')
        // .populate('list_cata')
        // .populate('list_tag')       
        .then(data => {
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
        const series = new Series({
            _id:i,
            id: i,
            name: req.body.name,
            name_re: req.body.name_re,
            count_movie: 0,
            urlavatar: '',
            year_str: req.body.year_str,
            year_end: req.body.year_end,
            content: req.body.content,
            content_re: req.body.content,
            warning: 0,
            private: req.body.private,
            company: req.body.company,
            list_actor : req.body.list_actor,
            list_cata : req.body.list_cata,
            list_tag : req.body.list_tag,
            creattime : new Date(),
            usercreat : req.body.usercreat ,
            status:0, 
            updatetime : new Date(),
        })
        series.save().then(data=>{
            res.status(200).json({Series : data});
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

exports.UpdateSeries = (req, res, next) => {
    try {
        var update ={};
        if (req.body.name) update = { ...update, name: req.body.name };
        if (req.body.name_re) update = { ...update, name_re: req.body.name_re };
        if (req.body.year_str) update = { ...update, year_str: req.body.year_str };
        if (req.body.year_end) update = { ...update, year_end: req.body.year_end };
        if (req.body.content) update = { ...update, content: req.body.content };

        if (req.body.warning) update = { ...update, warning: req.body.warning };
        if (req.body.list_cata) update = { ...update, list_cata: req.body.list_cata };
        if (req.body.list_tag) update = { ...update, list_tag: req.body.list_tag };
        if (req.body.list_actor) update = { ...update, list_actor: req.body.list_actor };
        if (req.body.company) update = { ...update, company: req.body.company };


        Series.updateOne({_id:req.params.id},update).then(data2=>{
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

exports.DeleteSeries = (req, res, next) => {
    try {
        Series.updateOne({_id:req.params.id},{status:1}).then(data2=>{
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