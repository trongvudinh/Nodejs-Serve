const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MenuController = require('./../controller/menu');

router.get('',MenuController.GetAllMenu);


module.exports = router;