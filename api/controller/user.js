const User = require('./../models/user');
const log = require('./../FuncLib/FuncLog');

exports.getuser = (req,res,next)=>{
    // User.updateOne({id: '60859615e1a93c3348d38ba2'},{lst_friend:[{id:'6085960db543e0451cb92740', creattime:new Date()},{id:'608596078d03ac37f41ac105', creattime:new Date()}]})
    User.find()
    .then(data => {
        log.LogError(data,req,res);
        res.status(200).json({ok:data})
    })
    .catch(err => {
        console.log('1');
        console.log(err);
        res.status(200).json({ok:err})
    });
}