const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const SeriesController = require('../controller/series');
const TokenController = require('../middleware/token');
const uploadFile =require('../controller/uploadfile');

router.get('',SeriesController.GetAllSeries);

router.post('/creat',TokenController.is_admin,SeriesController.CreatNewCompany);
router.post('/UpdateSeries/:id',TokenController.is_admin,SeriesController.UpdateSeries);
router.post('/DeleteSeries/:id',TokenController.is_admin,SeriesController.DeleteSeries);
router.post('/uploadfile/:id',TokenController.is_admin,uploadFile.uploadSeriesAvatar)


module.exports = router;