const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserController = require('./../controller/user');
const UserActiveController = require('./../controller/user_active');
const UserSettingController = require('./../controller/user_setting');
const TokenController = require('./../middleware/token');
const uploadFile = require('./../controller/uploadfile');

//=======================================      GET     =========================================================
//=======================================      GET     =========================================================
//=======================================      GET     =========================================================
//=======================================      GET     =========================================================
router.get('/getuserlogin',TokenController.is_token,UserController.getuserlogin);
router.get('/checkusername/:username',UserController.checkusername);
router.get('/GetNotification/:limit',TokenController.is_user,UserController.GetNotification);
router.get('/GetApproved/:limit',TokenController.is_user,UserController.GetApproved);
router.get('/getaproved_send',TokenController.is_user,UserController.getaproved_send);
router.get('/getlistemoj',TokenController.is_user,UserController.getlistemoj);
router.get('/getHistoryEmoj',TokenController.is_user,UserController.getHistoryEmoj);

// =================    User Active        ===============================================================================
// =======================================================================================================================

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
router.post('/login',UserController.login);
router.post('/creatusertemp',UserController.creatusertemp);
router.post('/refreshtoken',UserController.refreshtoken);
router.post('/ChangeAvatar',TokenController.is_user,uploadFile.uploadUserAvatar);
router.post('/test',UserController.test);



module.exports = router;    