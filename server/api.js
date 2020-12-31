const express = require('express');
const minionsRouter = require('./minions-router.js');

const apiRouter = new express.Router();

apiRouter.use('/minions', minionsRouter);

module.exports = apiRouter;
