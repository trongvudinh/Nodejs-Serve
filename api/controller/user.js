const User = require('./../models/user');
const log = require('./../FuncLib/FuncLog');
const jwtHellper = require('./../FuncLib/token');
const val_Const = require('./../const/index');
const mongoose= require('mongoose');

const Notification = require('./../models/notification');
const Approved = require('./../models/approved');
const Token = require('./../models/token');
const NotiNotSeen = require('./../models/noti_notseen');

//=============================================GET=========================================================
//=============================================GET=========================================================
//=============================================GET=========================================================
//=============================================GET=========================================================
//=============================================GET=========================================================

exports.getuserlogin = (req, res, next)=>{
    try {
        User.find({id : req.jwtDecoded.data.id }).then(data=>{    
            if (data.length >0 ){
                res.status(200).json(data[0]);
                log.LogInfo(req.originalUrl);
            }
            else {
                res.status(401).json();
                log.LogError('loi 401',req,res);
            }
        }).catch(err =>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}
exports.GetNotification = (req, res, next)=>{
    try {
        var leveluser =parseInt(req.jwtDecoded.data.level ,10);
        var limit = parseInt(req.params.limit ,10)
        var find_val = {}
        if (leveluser >= 7) find_val={ $and:[ {status : 0} , {$or :[ {"touser.id" : req.jwtDecoded.data.id},{isto_admin : 0}]}]};
        else find_val = {status : 0 ,id : req.jwtDecoded.data.id};
        Notification.find(find_val).sort({creattime : -1}).skip(limit * 20).limit(20).then(async data=>{
            var count_seen = 0;
            const re =data.map((d,index)=>{
                return {...d,admin:d.isto_admin,isnoti : 0};
            })     
            var find_cont = leveluser >= 7 ? {user : $in[val_Const.idadmin.IDNOTINOTSEEN ,req.jwtDecoded.data.id]}:{ user : req.jwtDecoded.data.id} ;
            var count_seen =  await NotiNotSeen.find(find_cont);
            const re_count = count_seen.noti_notseen + count_seen.app_notseen;
            res.status(200).json({ Approved : re , CountNotSeen : re_count});
            log.LogInfo(req.originalUrl);
        }).catch(err=>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}

exports.GetApproved = (req, res, next)=>{
    try {
        var leveluser =parseInt(req.jwtDecoded.data.level ,10);
        var limit = parseInt(req.params.limit ,10)
        var find_val = {}
        if (leveluser >= 7) find_val={ $and:[ {status : 0} , {$or :[ {"touser.id" : req.jwtDecoded.data.id},{isto_admin : 0}]}]};
        else find_val = {status : 0 ,id : req.jwtDecoded.data.id};
        Approved.find(find_val).sort({creattime : -1}).skip(limit * 20).limit(20).then(data=>{
            const re =data.map((d,index)=>{
                return {...d,admin:d.isto_admin,isnoti : 1};
            })      
            var find_cont = leveluser >= 7 ? {user : $in[val_Const.idadmin.IDNOTINOTSEEN ,req.jwtDecoded.data.id]}:{ user : req.jwtDecoded.data.id} ;
            var count_seen =  await NotiNotSeen.find(find_cont);
            const re_count = count_seen.noti_notseen + count_seen.app_notseen;      
            res.status(200).json({ Approved : re , CountNotSeen : re_count});
            log.LogInfo(req.originalUrl);
        }).catch(err=>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}

exports.getaproved_send = (req, res, next)=>{
    try {
        Approved.find({user_creat : req.jwtDecoded.data.id }).sort({creattime : -1}).then(data=>{    
            const re =data.map((d,index)=>{
                return {...d,admin:d.isto_admin,isnoti : 1};
            }) 
            res.status(200).json({ Approved : re });
            log.LogInfo(req.originalUrl);
        }).catch(err =>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}

//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================
exports.refreshtoken = (req, res, next)=>{
    try {
        User.find({ id:req.body.id ,status : 0}).select(val_Const.select.SELECT_USER).then(async data=>{
            const re = await jwtHellper.generateToken(data[0],process.env.JWT_SECRET,process.env.JWT_TOKENLIFE);
            const token = new Token({
                _id: new mongoose.Types.ObjectId(),
                user : data[0].id,
                type : 0,
                token : re,
                refreshtoken : '',
                creattime :new Date(),
            })
            token.save().then();
            res.status(200).json({ token : re});
            log.LogInfo(req.originalUrl);
        }).catch(err=>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}
























exports.getuser = (req,res,next)=>{
    // User.updateOne({id: '60859615e1a93c3348d38ba2'},{lst_friend:[{id:'6085960db543e0451cb92740', creattime:new Date()},{id:'608596078d03ac37f41ac105', creattime:new Date()}]})
    User.find()
    .then(data => {
        // log.LogError(data,req,res);
        const re = [{a:'1',b:'2'},{a:'1',b:'3'}];
        const sc = re.map((d,index)=>{
            return {...d,a:'3',c:'c'};
        })
        // const sc = {...re,a:'3'};
        res.status(200).json({ok:data , xx:sc});
    })
    .catch(err => {
        // console.log('1');
        console.log(err);
        res.status(200).json({ok:err})
    });
}