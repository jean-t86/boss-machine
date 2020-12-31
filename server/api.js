const express = require('express');
const minionsRouter = require('./minions-router.js');
const ideasRouter = require('./ideas-router.js');
const meetingsRouter = require('./meetings-router.js');
const workRouter = require('./work-router.js');

const apiRouter = new express.Router();

minionsRouter.use('/:minionId/work', workRouter);
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
