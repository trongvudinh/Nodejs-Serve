const User = require('./../models/user');
const log = require('./../FuncLib/FuncLog');
const jwtHellper = require('./../FuncLib/token');
const val_Const = require('./../const/index');
const FuncLib = require('./../FuncLib/FuncLib');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Notification = require('./../models/notification');
const Approved = require('./../models/approved');
const Token = require('./../models/token');
const UserEmojiList = require('./../models/user_emoj_list');
const UserHistoryEmoji = require('./../models/user_history_emoji');
const UserActive = require('./../models/user_active');
const UserFile = require('./../models/user_file');
const NotiNotSeen = require('./../models/noti_notseen');
const UserTemp = require('./../models/user_temp');
const UserRefreshToken = require('./../models/user_refreshtoken');

//=============================================GET=========================================================
//=============================================GET=========================================================
//=============================================GET=========================================================
//=============================================GET=========================================================
//=============================================GET=========================================================

exports.getuserlogin = (req, res, next) => {
    try {
        if(req.jwtDecoded.data.type == 0 ){
            User.find({ id: req.jwtDecoded.data.id }).then(data => {
                if (data.length > 0) {
                    res.status(200).json({user:data[0]});
                    log.LogInfo(req.originalUrl);
                }
                else {
                    res.status(401).json();
                    log.LogError('loi 401', req, res);
                }
            }).catch(err => {
                res.status(500).json({ error: err });
                log.LogError(err, req, res);
            })
        }
        else{
            UserTemp.find({id:req.jwtDecoded.data.id }).then(data => {
                if (data.length > 0) {
                    res.status(200).json({user : data[0]});
                    log.LogInfo(req.originalUrl);
                }
                else {
                    res.status(401).json();
                    log.LogError('loi 401', req, res);
                }
            }).catch(err => {
                res.status(500).json({ error: err });
                log.LogError(err, req, res);
            })
        }
    } catch (error) {
        log.LogError(error, req, res)
    }
}
// =========== GetNotification + Approved===============================================================
exports.GetNotification = (req, res, next) => {
    try {
        var leveluser = parseInt(req.jwtDecoded.data.level, 10);
        var limit = parseInt(req.params.limit, 10)
        var find_val = {}
        if (leveluser >= 7) find_val = { $and: [{ status: 0 }, { $or: [{ "touser.id": req.jwtDecoded.data.id }, { isto_admin: 0 }] }] };
        else find_val = { status: 0, id: req.jwtDecoded.data.id };
        Notification.find(find_val).sort({ creattime: -1 }).skip(limit * 20).limit(20).then(async data => {
            var count_seen = 0;
            const re = data.map((d, index) => {
                return { ...d, admin: d.isto_admin, isnoti: 0 };
            })
            var find_cont = leveluser >= 7 ? { user: $in[val_Const.idadmin.IDNOTINOTSEEN, req.jwtDecoded.data.id] } : { user: req.jwtDecoded.data.id };
            var count_seen = await NotiNotSeen.find(find_cont);
            const re_count = count_seen.noti_notseen + count_seen.app_notseen;
            res.status(200).json({ Approved: re, CountNotSeen: re_count });
            log.LogInfo(req.originalUrl);
        }).catch(err => {
            res.status(500).json({ error: err });
            log.LogError(err, req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}

exports.GetApproved = (req, res, next) => {
    try {
        var leveluser = parseInt(req.jwtDecoded.data.level, 10);
        var limit = parseInt(req.params.limit, 10)
        var find_val = {}
        if (leveluser >= 7) find_val = { $and: [{ status: 0 }, { $or: [{ "touser.id": req.jwtDecoded.data.id }, { isto_admin: 0 }] }] };
        else find_val = { status: 0, id: req.jwtDecoded.data.id };
        Approved.find(find_val).sort({ creattime: -1 }).skip(limit * 20).limit(20).then(async data => {
            const re = data.map((d, index) => {
                return { ...d, admin: d.isto_admin, isnoti: 1 };
            })
            var find_cont = leveluser >= 7 ? { user: $in[val_Const.idadmin.IDNOTINOTSEEN, req.jwtDecoded.data.id] } : { user: req.jwtDecoded.data.id };
            var count_seen = await NotiNotSeen.find(find_cont);
            const re_count = count_seen.noti_notseen + count_seen.app_notseen;
            res.status(200).json({ Approved: re, CountNotSeen: re_count });
            log.LogInfo(req.originalUrl);
        }).catch(err => {
            res.status(500).json({ error: err });
            log.LogError(err, req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}

exports.getaproved_send = (req, res, next) => {
    try {
        Approved.find({ user_creat: req.jwtDecoded.data.id }).sort({ creattime: -1 }).then(data => {
            const re = data.map((d, index) => {
                return { ...d, admin: d.isto_admin, isnoti: 1 };
            })
            res.status(200).json({ Approved: re });
            log.LogInfo(req.originalUrl);
        }).catch(err => {
            res.status(500).json({ error: err });
            log.LogError(err, req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}
// =========== Get  Emoji===============================================================
exports.getlistemoj = (req, res, next) => {
    try {
        UserEmojiList.find({ user: req.jwtDecoded.data.id }).sort({ creattime: -1 }).then(data => {
            const re = data.map((d, index) => {
                return d.val;
            })
            res.status(200).json({ ListEmoj: re });
            log.LogInfo(req.originalUrl);
        }).catch(err => {
            res.status(500).json({ error: err });
            log.LogError(err, req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}
exports.getHistoryEmoj = (req, res, next) => {
    try {
        UserHistoryEmoji.find({ user: req.jwtDecoded.data.id }).populate('Emoji').sort({ creattime: -1 }).then(data => {
            const re = data.map((d, index) => {
                return d.val;
            })
            res.status(200).json({ HistoryEmoj: re });
            log.LogInfo(req.originalUrl);
        }).catch(err => {
            res.status(500).json({ error: err });
            log.LogError(err, req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}



// =========== User Setting===============================================================


//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================

exports.signup = (req, res, next) => {
    try {

        const salt =  parseInt(process.env.SALTROUNDS ,10)
        bcrypt.hash(req.body.pass, salt, async function (err, hash) {
            if (err || (req.body.username.trim() == "") || (req.body.pass.trim() == "")){
                log.LogError("Username không hợp lệ", req, res);
                return res.status(500).json({err:"Request không hợp lệ"});
            }
            const checkexits = await User.find({username : req.body.username}).exec();
            if (checkexits.length > 0) {
                log.LogError("Tên đăng nhập đã tồn tại", req, res);
                return res.status(500).json({err:"Tên đăng nhập đã tồn tại"})
            }
            const s = mongoose.Types.ObjectId();
            const user = new User({
                _id: s,
                id: s,
                username: req.body.username,
                pass: hash,
                level: 0,
                urlavatar: "",
                background: '',
                email: req.body.email,
                britday: new Date(req.body.britday),
                thanhpho: req.body.thanhpho,
                diachi: req.body.diachi,
                hoten: req.body.hoten,
                gioitinh: req.body.gioitinh,
                sdt: req.body.sdt,
                nghenghiep: req.body.nghenghiep,
                sothich: req.body.sothich,
                creattime: new Date(),
                lst_friend: [],
                lst_movie_playback: [],
                lst_movie_favorite: [],
                lst_movie_like: [],
                lst_movie_dislike: [],
                lst_follow: [],
                lst_commentlike: [],
                lst_commentdislike: [],
                status: 0 
            })
            user.save()
            .then( data =>{
                const id_useractive = mongoose.Types.ObjectId();
                // ==============================================     user Active    ============================
                const useractive = new UserActive({
                    _id : id_useractive,
                    id: id_useractive,
                    user:s,
                    backgroundAvatar: "",
                    list_emoj: [],
                    list_messCheckPoint: [],
                    list_blockuser: [],
                    libraryImg: [],
                    status: 0
                })
                useractive.save();
                // ==============================================     user File      ============================
                const id_userfile = mongoose.Types.ObjectId();
                const userFile = new UserFile({
                    _id : id_userfile,
                    user: s,
                    totalvalue: 0,
                    creattime : new Date(),
                })
                userFile.save();
                // ==============================================     user Not Seen      ============================
                const id_notseen = mongoose.Types.ObjectId();
                const usernotsseen = new NotiNotSeen({
                    _id : id_notseen,
                    user : s,
                    creattime:new Date(),
                    updatetime:new Date(),
                    noti_notseen: 0,
                    app_notseen:  0,
                    list_UpdateNotiTime: [],
                    list_UpdateNotiVal: [],
                    list_UpdateAppTime: [],
                    list_UpdateAppVal: [],
                    status:0
                })
                usernotsseen.save();
                return res.status(200).json({User:user})
            })
            .catch()
        });
    } catch (error) {
        log.LogError(error, req, res)
    }
}

exports.login = async(req, res, next) => {
    try {
        console.log(req.body);
        const salt =  parseInt(process.env.SALTROUNDS ,10)
        bcrypt.hash(req.body.pass, salt, function (err, hash) {
            console.log(hash);
            if (err){
                log.LogError(err, req, res);
                return res.status(500).json("Tài khoản và mật khẩu không đúng");
            }
            User.find({username:req.body.username,pass : hash}).then(data =>{
                if (data.length >0 ){
                    log.LogError(err, req, res);
                    return res.status(200).json({user:data[0]});
                }
                else{
                    log.LogError(err, req, res);
                    return res.status(500).json("Tài khoản và mật khẩu không đúng");
                }
            })
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}


//===================================  Creat User Temp   =====================================

exports.creatusertemp = async(req, res, next) => {
    try {
        const name = await FuncLib.randomname();
        const urlavatar = await FuncLib.randomavatar();
        const username = FuncLib.randomUserTempId();
        console.log('username -',username);
        const  s= mongoose.Types.ObjectId();
        const usertemp = new UserTemp({
            _id:s,
            id: s,
            username: username,
            level: 0,
            urlavatar: urlavatar,
            hoten: name,
            creattime: new Date(),
            lst_movie_like:[],
            lst_movie_dislike:[],
            lst_commentlike:[],
            lst_commentdislike:[],
            status: 0
        });
        usertemp.save().then(async data=>{
            const re = await jwtHellper.generateToken(usertemp, process.env.JWT_SECRET, process.env.JWT_TOKENUSERTEMPLIFE,1);
            const token = new Token({
                _id: new mongoose.Types.ObjectId(),
                user: s,
                type: 1,
                token: re,
                refreshtoken: '',
                creattime: new Date(),
            })
            token.save();
            res.status(200).json({ user: usertemp, token : re});
            log.LogInfo(req.originalUrl);
        }).catch(err =>{
            console.log(err);
            res.status(500).json({ error: err });
            log.LogError(err, req, res);
        });
    } catch (error) {
        log.LogError(error, req, res)
    }
}
exports.refreshtoken = async(req, res, next) => {
    try {
        // const re = await UserRefreshToken.find({user : req.jwtDecoded.data.id}).sort({creattime : -1}).limit(1);


        User.find({ id: req.jwtDecoded.data.id, status: 0 }).select(val_Const.select.SELECT_USER).then(async data => {
            const re = await jwtHellper.generateToken(data[0], process.env.JWT_SECRET, process.env.JWT_TOKENLIFE,0);
            const token = new Token({
                _id: new mongoose.Types.ObjectId(),
                user: data[0].id,
                type: 0,
                token: re,
                refreshtoken: '',
                creattime: new Date(),
            })
            token.save().then();
            res.status(200).json({ token: re });
            log.LogInfo(req.originalUrl);
        }).catch(err => {
            res.status(500).json({ error: err });
            log.LogError(err, req, res);
        })
    } catch (error) {
        log.LogError(error, req, res)
    }
}
























exports.getuser = (req, res, next) => {
    // User.updateOne({id: '60859615e1a93c3348d38ba2'},{lst_friend:[{id:'6085960db543e0451cb92740', creattime:new Date()},{id:'608596078d03ac37f41ac105', creattime:new Date()}]})
   
    var a = new Date('2021/02/05 03:00:00'); // Current date now.
    var b = new Date('2021/02/05 00:00:00'); // Start of 2010.
    console.log(a);
    console.log(b);
    var d = (a-b); // Difference in milliseconds.
    res.status(200).json({ok:d})
}