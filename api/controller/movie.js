const log = require('../FuncLib/FuncLog');
const val_Const = require('../const/index');
const mongoose = require('mongoose');
const FuncApproved =require('./../FuncLib/FuncApproved');
const FuncLib = require('./../FuncLib/FuncLib');

const Movie = require('../models/movie');
const GoogleDrive = require('./../FuncLib/googledrive');
const UserSocket = require('./../../realtime/userSocket');
const User = require('./../models/user');
const Menu = require('../models/menu');
const Catalog = require('../models/catalog');
const Actor = require('./../models/actor');
const Series = require('./../models/series');
const Tag = require('./../models/tag');
const Approved = require('./../models/approved');

exports.GetAllSeries = (req, res, next) => {
    try {
        Movie.find({status:0})
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

exports.CreatNewMovie = async(req, res, next) => {
    try {
        const exitFile =UserSocket.checkExitsFieldId(req.body.socketId,req.body.fileId);
        if (!exitFile) return res.status(500).json({message : 'Không có video'});
        var dateName = new Date().toISOString();
        const fname = `${req.body.name}-${dateName}.${req.body.fileType}`;
        const key = { note: 'Movie', table: 'movie', val: req.params.id };
        const upFile = await GoogleDrive.newFileByTemp(req.body.fileId, fname, req.jwtDecoded.data.id, "upload.movie", key,req.body.fileType);
        if (upFile.status == 'ok'){
            const deleteFileTemp = await GoogleDrive.DeleteVideoTemp(req.body.fileId);
            if (deleteFileTemp.status == 'ok'){
                UserSocket.removeVideoTemp(req.body.socketId,req.body.fileId)
            }
            const i= new mongoose.Types.ObjectId();
            const movie = new Movie({
                _id:i,
                id: i,
                name: req.body.name,
                name_re: req.body.name_re,
                name_en : req.body.name_en,
                n_view: 0,
                n_like: 0,
                n_dislike: 0,
                year_movie: 0,
                time_thoiluong: req.body.thoiluong,
                warning: 0,
                content: req.body.content,
                content_re :req.body.content_re,
                urlavatar :'',
                type_mov: req.body.priva,
                user_creat : req.body.usercreat ,
                creattime : new Date(),
                user_update:req.body.usercreat,
                updatetime: new Date(),
                series:'',
                serve:[{
                    url:FuncLib.getUrlByIdFile(upFile.data.id,1,upFile.gmail),
                    list_quality:[req.body.quality]
                }],
                status:0, 
            })
            movie.save().then(data=>{
                Actor.updateMany({_id: {$in : req.body.list_actor}},{$inc :{countMov: 1 }}).exec();
                Tag.updateMany({_id: {$in : req.body.list_tag}},{$inc :{sl_movie: 1 }}).exec();
                res.status(200).json({Movie : data});
            }).catch(err=>{
                res.status(500).json({ error: err });
                log.LogError(err, req, res);
            });
        }
        else return res.status(500).json({message: 'Tải Video lỗi'})          
    } 
    catch (error) {
        res.status(500).json({ error: error });
        log.LogError(error, req, res)
    }
}

exports.updateMovieSeries = (req, res, next) => {
    try {
        Movie.find({id : req.params.id }).then(data4=>{
            if (data4.length == 0 ) return res.status(500).json();
            if (data4[0].user_creat != req.jwtDecoded.data.id && req.jwtDecoded.data.level < 7) return res.status(500).json({message: 'Video không phải của bạn'}); 
            Series.find({id : req.body.series}).then(data2=>{
                if (data2.length == 0) return res.status(500).json();
                const se = data2[0];
                if (req.jwtDecoded.data.level >=7 || req.jwtDecoded.data.id == se.usercreat){
                    Movie.updateOne({_id : req.params.id},{ series : req.body.series}).exec();
                    res.status(200).json({creatApproved :1});
                }

                else{
                    //-------------Tao Approved -------------------------
                    const i= new mongoose.Types.ObjectId();
                    const approved =new Approved({
                        _id:i,
                        id:i,
                        app_code:2,
                        name: 'Phê duyệt series',
                        content: FuncApproved.creatContentApproved(2,req.jwtDecoded.data.id,{},se),
                        note: FuncApproved.creatNoteApproved(2,req.jwtDecoded.data.id,{},se),
                        urlinfo:FuncApproved.creatUrlInfo(2,req.jwtDecoded.data.id,{},{id:req.params.id}),
                        action:[{
                            table_name : 'Movie',
                            fieldname : 'series',
                            keyid : req.params.id,
                            value:{
                                type_val: 'String',
                                val:req.body.series
                            },
                            method:'Update',
                            fieldmethod:'set'
                        }],
                        isto_admin : 1,
                        touser : se.usercreat,
                        user_creat: req.jwtDecoded.data.id.id,
                        creattime : new Date(),
                        updatetime: new Date(),
                        seen:0,
                        disablenoti:0,
                        confirm_status :0,
                        status:0
                    });
                    approved.save().then(data3 =>{
                        res.status(200).json({creatApproved : 0,approved:approved});

                    }).catch(err => {
                        log.LogError(err, req, res);
                        return res.status(500).json({ error: err })
                    }) ;
                }
            }).catch(err => {
                log.LogError(err, req, res);
                return res.status(500).json({ error: err })
            })  
        })        
    }catch (error) {
        res.status(500).json({ error: error });
        log.LogError(error, req, res)
    }
}
exports.updateMovieWarning = (req, res, next) => {
    try {
        const warning = parseInt(req.body.warning,10);
        Movie.find({id : req.params.id }).then(data4=>{
            if (data4.length == 0 ) return res.status(500).json();
            if (data4[0].user_creat != req.jwtDecoded.data.id && req.jwtDecoded.data.level < 7) return res.status(500).json({message: 'Video không phải của bạn'}); 
            if (req.jwtDecoded.data.level >=7 || warning == 0 ){
                Movie.updateOne({_id : req.params.id},{ series : warning}).exec();
                res.status(200).json({creatApproved :1});
            }
            else{
                //-------------Tao Approved -------------------------
                const i= new mongoose.Types.ObjectId();
                const approved =new Approved({
                    _id:i,
                    id:i,
                    app_code:1,
                    name: 'Phê duyệt warning',
                    content: FuncApproved.creatContentApproved(1,req.jwtDecoded.data.id,{},''),
                    note: FuncApproved.creatNoteApproved(1,req.jwtDecoded.data.id,{},{warning : warning}),
                    urlinfo:FuncApproved.creatUrlInfo(1,req.jwtDecoded.data.id,{},{id:req.params.id}),
                    action:[{
                        table_name : 'Movie',
                        fieldname : 'warning',
                        keyid : req.params.id,
                        value:{
                            type_val: 'String',
                            val:warning
                        },
                        method:'Update',
                        fieldmethod:'set'
                    }],
                    isto_admin : 0,
                    touser : '_',
                    user_creat: req.jwtDecoded.data.id.id,
                    creattime : new Date(),
                    updatetime: new Date(),
                    seen:0,
                    disablenoti:0,
                    confirm_status :0,
                    status:0
                });
                approved.save().then(data3 =>{
                    res.status(200).json({creatApproved : 0,approved:approved});

                }).catch(err => {
                    log.LogError(err, req, res);
                    return res.status(500).json({ error: err })
                }) ;
            } 
        })        
    }catch (error) {
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


        Movie.updateOne({_id:req.params.id},update).then(data2=>{
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