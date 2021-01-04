const express = require('express');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
} = require('./db.js');
const apiRouter = new express.Router();

apiRouter.get('/minions', (req, res) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).json({minions});
});

apiRouter.get('/minions/:minionId', (req, res) => {
  const id = req.params.minionId;
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    res.status(200).json(minion);
  } else {
    res.status(404).json();
  }
});

const validateMinion = (req, res, next) => {
  const minion = req.body;
  if (minion.name && minion.title && minion.weaknesses && minion.salary) {
    req.minion = minion;
    next();
  } else {
    res.status(400).json();
  }
};

apiRouter.post('/minions', validateMinion, (req, res) => {
  const minion = addToDatabase('minions', req.minion);
  res.status(201).json(minion);
});

apiRouter.put('/minions/:minionId', validateMinion, (req, res) => {
  req.minion.id = req.params.minionId;
  const minion = updateInstanceInDatabase('minions', req.minion);
  if (minion) {
    res.status(200).json(minion);
  } else {
    res.status(404).json();
  }
});

module.exports = apiRouter;
