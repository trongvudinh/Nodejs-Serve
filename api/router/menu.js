const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MenuController = require('./../controller/menu');
const TokenController = require('./../middleware/token');

router.get('',MenuController.GetAllMenu);

router.post('/AllMenu',TokenController.is_admin, MenuController.GenerateMenu);


module.exports = router;