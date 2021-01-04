const express = require('express');
const {getAllFromDatabase} = require('./db.js');
const apiRouter = new express.Router();

apiRouter.get('/minions', (req, res) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).send(minions);
});

module.exports = apiRouter;
