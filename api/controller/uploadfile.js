const User = require('./../models/user');
const Actor = require('./../models/actor');
const Company = require('./../models/company');
const Series = require('./../models/series');
const log = require('./../FuncLib/FuncLog');
const val_Const = require('./../const/index');
const FuncLib = require('./../FuncLib/FuncLib');
const UserSocket =require('./../../realtime/userSocket');
const mongoose = require('mongoose');

const GoogleDrive = require('./../FuncLib/googledrive');
const Movie = require('../models/movie');


exports.uploadUserAvatar = async (req, res, next) => {
    try {
        const file = req.files.file;
        User.find({ id: req.jwtDecoded.data.id, status: 0 }).select(val_Const.select.SELECT_USER).then(async data => {
            if (data.length == 0) {
                log.LogError('err', req, res);
                return res.status(500).json({ err: 'Tài khoản không tồn tại' });
            }
            const fname = `${data[0].username}-${FuncLib.getFilename(file.name, 0)}`;
            const key = { note: 'User Avatar', table: 'user', val: data[0].id }
            const upFile = await GoogleDrive.uploadFile(file, fname, req.jwtDecoded.data.id, "upload.avatar.user", key);
            if (upFile.status == 'ok') {
                User.updateOne({ id: req.jwtDecoded.data.id }, { urlavatar: FuncLib.getUrlByIdFile(upFile.data.id,0,'') }).then(data => {
                    res.status(200).json({ url: FuncLib.getUrlByIdFile(upFile.data.id,0,'') });
                }).catch(err => {
                    res.status(500).json(err);
                })
            }
            else {
                res.status(500).json();
                log.LogError('UpFile loi');
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
            log.LogError(err, req, res);
        })
    } catch (error) {
        res.status(500).json(error);
        log.LogError(error, req, res)
    }
}
exports.uploadActorAvatar = async (req, res, next) => {
    try {
        const file = req.files.file;
        Actor.find({ id: req.params.id, status: 0 }).then(async data => {
            if (data.length > 0) {
                const fname = `${data[0].name}-${FuncLib.getFilename(file.name, 0)}`;
                const key = { note: 'Actor Avatar', table: 'actor', val: data[0].id }
                const upFile = await GoogleDrive.uploadFile(file, fname, req.jwtDecoded.data.id, "upload.avatar.actor", key);
                if (upFile.status == 'ok') {
                    Actor.updateOne({ _id: req.params.id }, { urlavatar: FuncLib.getUrlByIdFile(upFile.data.id,0,'') }).then(data => {
                        res.status(200).json({ url: FuncLib.getUrlByIdFile(upFile.data.id,0,'') });
                    }).catch(err => {
                        res.status(500).json(err);
                    })
                }
                else {
                    res.status(500).json();
                    log.LogError('UpFile loi');
                }
            } else {
                res.status(500).json();
                log.LogError('UpFile loi');
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
            log.LogError(err, req, res);
        })
    } catch (error) {
        res.status(500).json(error);
        log.LogError(error, req, res)
    }
}

exports.uploadCompanyAvatar = async (req, res, next) => {
    try {
        const file = req.files.file;
        Company.find({ id: req.params.id, status: 0 }).then(async data => {
            if (data.length == 0) {
                log.LogError('err', req, res);
                return res.status(500).json({ err: 'Company không tồn tại' });
            }
            const fname = `${data[0].name}-${FuncLib.getFilename(file.name, 0)}`;
            const key = { note: 'Company Avatar', table: 'company', val: data[0].id }
            const upFile = await GoogleDrive.uploadFile(file, fname, req.jwtDecoded.data.id, "upload.avatar.company", key);
            if (upFile.status == 'ok') {
                Company.updateOne({ _id: req.params.id }, { urlavatar: FuncLib.getUrlByIdFile(upFile.data.id,0 , '') }).then(data => {
                    res.status(200).json({ url: FuncLib.getUrlByIdFile(upFile.data.id,0,'') });
                }).catch(err => {
                    res.status(500).json(err);
                })
            }
            else {
                res.status(500).json();
                log.LogError('UpFile loi');
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
            log.LogError(err, req, res);
        })
    } catch (error) {
        res.status(500).json(error);
        log.LogError(error, req, res)
    }
}

exports.uploadSeriesAvatar = async (req, res, next) => {
    try {
        const file = req.files.file;
        Series.find({ id: req.params.id, status: 0 }).then(async data => {
            if (data.length == 0) {
                log.LogError('', req, res);
                return res.status(500).json({ err: 'Series không tồn tại' });
            }
            const fname = `${data[0].name}-${FuncLib.getFilename(file.name, 0)}`;
            const key = { note: 'Series Avatar', table: 'series', val: data[0].id }
            const upFile = await GoogleDrive.uploadFile(file, fname, req.jwtDecoded.data.id, "upload.avatar.series", key);
            if (upFile.status == 'ok') {
                Series.updateOne({ _id: req.params.id }, { urlavatar: FuncLib.getUrlByIdFile(upFile.data.id,0,'') }).then(data => {
                    res.status(200).json({ url: FuncLib.getUrlByIdFile(upFile.data.id,0,'') });
                }).catch(err => {
                    res.status(500).json(err);
                })
            }
            else {
                res.status(500).json();
                log.LogError('UpFile loi');
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
            log.LogError(err, req, res);
        })
    } catch (error) {
        res.status(500).json(error);
        log.LogError(error, req, res)
    }
}

exports.uploadMoviePoster = async (req, res, next) => {
    try {
        const file = req.files.file;
        console.log(file);
        Movie.find({id:req.params.id}).then(async data=>{
            if (data.length == 0) {
                log.LogError('err', req, res);
                return res.status(500).json({ err: 'Video không tồn tại' });
            }
            if (data[0].user_creat != req.jwtDecoded.data.id) return res.status(500).json({ err: 'Video không phải của bạn' });
            const fname = `${data[0].name}-${FuncLib.getFilename(file.name, 0)}`;
            const key = { note: 'Poster Movie', table: 'movie', val: data[0].id }
            const upFile = await GoogleDrive.uploadFile(file, fname, req.jwtDecoded.data.id, "upload.avatar.movie", key);
            if (upFile.status == 'ok') {
                Movie.updateOne({ _id: req.params.id }, { urlavatar: FuncLib.getUrlByIdFile(upFile.data.id,0,'') }).then(data2 => {
                    res.status(200).json({ url: FuncLib.getUrlByIdFile(upFile.data.id,0,'') });
                }).catch(err => {
                    res.status(500).json(err);
                })
            }
            else {
                res.status(500).json();
                log.LogError('UpFile loi');
            }
        }).catch(err => {
            res.status(500).json(err);
            log.LogError(err, req, res);
        })
    } catch (error) {
        res.status(500).json(error);
        log.LogError(error, req, res)
    }
}

exports.uploadVideoTemp = async (req, res, next) => {
    try {
        const file = req.files.file;
        console.log(file);
        const check =UserSocket.checkExitsSocketId(req.params.socketId);
        if (check){
            const fname = `${FuncLib.getFilename(file.name, 0)}`;
            const upFile = await GoogleDrive.upLoadvideoTemp(file, fname);
            console.log('upfile:',upFile);
            if (upFile.status == 'ok') {
                UserSocket.addVideoTemp(req.params.socketId,upFile.data.id);
                return res.status(200).json({ 
                    url: FuncLib.getUrlByIdFile(upFile.data.id,1,upFile.gmail) ,
                    fileId : upFile.data.id,
                    fileType:file.mimetype
                });
            }
            else {
                res.status(500).json();
                log.LogError('UpFile loi');
            }
        }
        else{
            return res.status(500).json({ err: 'SocketId không tồn tại' });
        }
    } catch (error) {
        res.status(500).json(error);
        log.LogError(error, req, res)
    }
}