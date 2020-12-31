const express = require('express');
const {getAllWorkByMinionId} = require('./db.js');
const workRouter = new express.Router({mergeParams: true});

workRouter.get('/', (req, res) => {
  const allWorkForMinion = getAllWorkByMinionId(req.minion.id);
  res.send(allWorkForMinion);
});

module.exports = workRouter;
