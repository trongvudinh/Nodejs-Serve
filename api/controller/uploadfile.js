const User = require('./../models/user');
const Actor = require('./../models/actor');
const log = require('./../FuncLib/FuncLog');
const val_Const = require('./../const/index');
const FuncLib = require('./../FuncLib/FuncLib');
const mongoose= require('mongoose');

const GoogleDrive = require('./../FuncLib/googledrive');


exports.uploadUserAvatar = async(req, res, next) => {
    try {
        const file = req.files.file;
        User.find({ id: req.jwtDecoded.data.id, status: 0 }).select(val_Const.select.SELECT_USER).then(async data => {
            if (data.length = 0){
                return res.status(500).json( {err:'err'} );
                log.LogError(err, req, res);
            }
            const fname = `${data[0].username}-${FuncLib.getFilename(file.name,0)}`;
            const key = {note:'User Avatar',table :'user',val:data[0].id}
            const upFile = await GoogleDrive.uploadFile(file,fname,data[0].id,"upload.avatar.user",key);
            if (upFile.status == 'ok'){
                User.updateOne({id:req.jwtDecoded.data.id},{urlavatar : FuncLib.getUrlByIdFile(upFile.data.id)}).then(data=>{
                    res.status(200).json({url:FuncLib.getUrlByIdFile(upFile.data.id)});
                }).catch(err =>{
                    res.status(500).json(err);
                })
            }
            else {
                res.status(500).json();
                log.LogError('UpFile loi');
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json( err );
            log.LogError(err, req, res);
        })
    } catch (error) {
        res.status(500).json(error );
        log.LogError(error, req, res)
    }
}
exports.uploadActorAvatar = async(req, res, next) => {
    try {
        const file = req.files.file;
        Actor.find({ id: req.params.id, status: 0 }).then(async data => {
            const fname = `${data[0].name}-${FuncLib.getFilename(file.name,0)}`;
            const key = {note:'Actor Avatar',table :'actor',val:data[0].id}
            const upFile = await GoogleDrive.uploadFile(file,fname,data[0].id,"upload.avatar.actor",key);
            if (upFile.status == 'ok'){
                Actor.updateOne({_id:req.params.id},{urlavatar : FuncLib.getUrlByIdFile(upFile.data.id)}).then(data=>{
                    res.status(200).json({url:FuncLib.getUrlByIdFile(upFile.data.id)});
                }).catch(err =>{
                    res.status(500).json(err);
                })
            }
            else {
                res.status(500).json();
                log.LogError('UpFile loi');
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json( err );
            log.LogError(err, req, res);
        })
    } catch (error) {
        res.status(500).json(error );
        log.LogError(error, req, res)
    }
}