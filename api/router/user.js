const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserController = require('./../controller/user');
const UserActiveController = require('./../controller/user_active');
const UserSettingController = require('./../controller/user_setting');
const TokenController = require('./../middleware/token');

//=======================================      GET     =========================================================
//=======================================      GET     =========================================================
//=======================================      GET     =========================================================
//=======================================      GET     =========================================================
router.get('/getuser',UserController.getuser);
router.get('/GetNotification/:limit',TokenController.is_user,UserController.GetNotification);
router.get('/GetApproved/:limit',TokenController.is_user,UserController.GetApproved);
router.get('/getaproved_send',TokenController.is_user,UserController.getaproved_send);
router.get('/getlistemoj',TokenController.is_user,UserController.getlistemoj);
router.get('/getHistoryEmoj',TokenController.is_user,UserController.getHistoryEmoj);

// =================    User Active        ===============================================================================
// ===========================================================================================================

router.get('/getMess_CheckPonit',TokenController.is_user,UserActiveController.getMess_CheckPonit);
router.get('/getlistBlockUser',TokenController.is_user,UserActiveController.getlistBlockUser);
router.get('/GetListUserBlockMe',TokenController.is_user,UserActiveController.GetListUserBlockMe);

// =================    Setting    ===============================================================================
// ===========================================================================================================
router.get('/getusersetting',TokenController.is_user,UserSettingController.getusersetting);


//=======================================      POST     =========================================================
//=======================================      POST     =========================================================
//=======================================      POST     =========================================================
//=======================================      POST     =========================================================

router.post('/signup',UserController.signup);
router.post('/creatusertemp',UserController.creatusertemp);
router.post('/refreshtoken',TokenController.is_user,UserController.refreshtoken);



module.exports = router;    