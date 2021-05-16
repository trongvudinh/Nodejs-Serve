const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ActorController = require('../controller/actor');
const TokenController = require('../middleware/token');
const uploadFile =require('./../controller/uploadfile');

router.get('',ActorController.GetAllActor);

router.post('/creat',TokenController.is_admin,ActorController.CreatNewActor);
router.post('/UpdateActor',TokenController.is_admin,ActorController.UpdateActor);
router.post('/DeleteActor',TokenController.is_admin,ActorController.DeleteActor);
router.post('/uploadfile/:id',TokenController.is_admin,uploadFile.uploadActorAvatar)


module.exports = router;