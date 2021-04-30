const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserController = require('./../controller/user');
const TokenController = require('./../middleware/token');

router.get('/getuser',UserController.getuser);
router.get('/GetNotification/:limit',TokenController.is_user,UserController.GetNotification);
router.get('/GetApproved/:limit',TokenController.is_user,UserController.GetApproved);
router.get('/getaproved_send',TokenController.is_user,UserController.getaproved_send);

router.post('/refreshtoken',TokenController.is_user,UserController.refreshtoken);



module.exports = router;    