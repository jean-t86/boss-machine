const express = require('express');
const minionsRouter = require('./minions-router.js');
const ideasRouter = require('./ideas-router.js');

const apiRouter = new express.Router();

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;
