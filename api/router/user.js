const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('./../models/user');

router.get('/getuser',(req,res,next)=>{
    User.find({id: '6085960db543e0451cb92740'} )
    .populate('lst_friend','id username pass')
    .populate()
    .then(data => res.status(200).json({ok:data}))
    .catch(err => res.status(200).json({ok:err}));
});
module.exports = router;    