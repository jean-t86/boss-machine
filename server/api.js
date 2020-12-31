const express = require('express');
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
} =require('./db.js');
const apiRouter = new express.Router();

apiRouter.get('/minions', (req, res) => {
  const minions = getAllFromDatabase('minions');
  res.send(minions);
});

apiRouter.param('minionId', (req, res, next, minionId) => {
  const minion = getFromDatabaseById('minions', minionId);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

apiRouter.get('/minions/:minionId', (req, res) => {
  res.send(req.minion);
});

const validateMinion = (req, res, next) => {
  const name = req.query.name;
  const title = req.query.title;
  const salary = req.query.salary;

  if (name && title && salary) {
    req.name = name;
    req.title = title;
    req.salary = salary;
    next();
  } else {
    res.status(400).send();
  }
};

apiRouter.post('/minions', validateMinion, (req, res) => {
  const minion = addToDatabase('minions',
      {
        name: req.name,
        title: req.title,
        salary: req.salary,
      });
  res.send(minion);
});

apiRouter.put('/minions/:minionId', validateMinion, (req, res) => {
  req.minion.name = req.name;
  req.minion.title = req.title;
  req.minion.salary = req.salary;
  updateInstanceInDatabase('minions', req.minion);
  res.send(req.minion);
});

module.exports = apiRouter;
