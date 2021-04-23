const express = require('express');
const app = express();

// ===========================router===================================
// ----------------------------------------------------------------------
const userRouter = require('./api/router/user');

app.use('/user',userRouter);


module.exports = app;