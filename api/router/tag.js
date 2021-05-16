const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TagController = require('../controller/tag');
const TokenController = require('../middleware/token');

router.get('',TagController.GetAllTag);

router.post('/NewTag',TokenController.is_admin,TagController.CreatNewTag);
router.post('/UpdateTag',TokenController.is_admin,TagController.UpdateTag);
router.post('/DeleteTag',TokenController.is_admin,TagController.DeleteTag);


module.exports = router;