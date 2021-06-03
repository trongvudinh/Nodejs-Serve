const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const CompanyController = require('../controller/company');
const TokenController = require('../middleware/token');
const uploadFile =require('../controller/uploadfile');

router.get('',CompanyController.GetAllCompany);

router.post('/creat',TokenController.is_admin,CompanyController.CreatNewCompany);
router.post('/UpdateActor/:id',TokenController.is_admin,CompanyController.UpdateCompany);
router.post('/DeleteActor/:id',TokenController.is_admin,CompanyController.DeleteCompany);
router.post('/uploadfile/:id',TokenController.is_admin,uploadFile.uploadCompanyAvatar)


module.exports = router;