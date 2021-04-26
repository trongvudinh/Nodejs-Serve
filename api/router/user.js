const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('./../models/user');

router.get('/getuser',(req,res,next)=>{
    // User.updateOne({id: '60859615e1a93c3348d38ba2'},{lst_friend:[{id:'6085960db543e0451cb92740', creattime:new Date()},{id:'608596078d03ac37f41ac105', creattime:new Date()}]})
    User.find({id: '60859615e1a93c3348d38ba2'})
    .populate('lst_friend.id')
    .then(data => res.status(200).json({ok:data}))
    .catch(err => res.status(200).json({ok:err}));
});
module.exports = router;    