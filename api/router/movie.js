const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MovieController = require('../controller/Movie');
const TokenController = require('../middleware/token');
const uploadFile =require('../controller/uploadfile');

router.get('',MovieController.GetAllSeries);

router.post('/creat',TokenController.is_user,MovieController.CreatNewMovie);
router.post('/updateMovieSeries/:id',TokenController.is_user,MovieController.updateMovieSeries);
router.post('/updateMovieWaring/:id',TokenController.is_user,MovieController.updateMovieWarning);

router.post('/uploadavatar/:id',TokenController.is_user,uploadFile.uploadMoviePoster);
router.post('/uploadvideo_Temp/:socketId',TokenController.is_user,uploadFile.uploadVideoTemp);


module.exports = router;