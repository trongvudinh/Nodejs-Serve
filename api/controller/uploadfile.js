const User = require('./../models/user');
const log = require('./../FuncLib/FuncLog');
const val_Const = require('./../const/index');
const FuncLib = require('./../FuncLib/FuncLib');
const mongoose= require('mongoose');

const GoogleDrive = require('./../FuncLib/googledrive');


exports.uploadUserAvatar = async(req, res, next) => {
    try {
        const file = req.files.file;
        User.find({ id: req.jwtDecoded.data.id, status: 0 }).select(val_Const.select.SELECT_USER).then(async data => {
            const fname = `${data[0].username}-${FuncLib.getFilename(file.name,0)}`;
            const upFile = await GoogleDrive.uploadFile(file,fname,data[0].id,"upload.avatar.user");
            if (upFile.status == 'ok'){
                User.updateOne({id:req.jwtDecoded.data.id},{urlavatar : FuncLib.getUrlByIdFile(upFile.data.id)}).then(data=>{
                    res.status(200).json();
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