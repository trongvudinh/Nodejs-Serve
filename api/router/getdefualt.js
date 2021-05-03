const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const GetDefualtController = require('./../controller/getdefualt');

router.get('/listReport',GetDefualtController.listReport);
router.get('/get_lst_bieucamimg',GetDefualtController.get_lst_bieucamimg);
router.get('/Getemoj',GetDefualtController.Getemoj);


module.exports = router;    