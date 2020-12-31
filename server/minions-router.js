const express = require('express');
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} =require('./db.js');
const minionsRouter = new express.Router();

minionsRouter.get('/', (req, res) => {
  const minions = getAllFromDatabase('minions');
  res.send(minions);
});

minionsRouter.param('minionId', (req, res, next, minionId) => {
  const minion = getFromDatabaseById('minions', minionId);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/:minionId', (req, res) => {
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

minionsRouter.post('/', validateMinion, (req, res) => {
  const minion = addToDatabase('minions',
      {
        name: req.name,
        title: req.title,
        salary: req.salary,
      });
  res.send(minion);
});

minionsRouter.put('/:minionId', validateMinion, (req, res) => {
  req.minion.name = req.name;
  req.minion.title = req.title;
  req.minion.salary = req.salary;
  updateInstanceInDatabase('minions', req.minion);
  res.send(req.minion);
});

minionsRouter.delete('/:minionId', (req, res) => {
  deleteFromDatabasebyId('minions', req.minion.id);
  res.status(204).send();
});

module.exports = minionsRouter;
