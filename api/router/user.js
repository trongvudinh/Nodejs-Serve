const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserController = require('./../controller/user');

router.get('/getuser',UserController.getuser);
module.exports = router;    