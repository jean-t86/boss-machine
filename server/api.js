const express = require('express');
const {getAllFromDatabase, addToDatabase} = require('./db.js');
const apiRouter = new express.Router();

apiRouter.get('/minions', (req, res) => {
  const minions = getAllFromDatabase('minions');
  res.send(minions);
});

const validateMinion = (req, res, next) => {
  const name = req.query.name;
  const title = req.query.title;
  const salary = req.query.salary;

  if (name && title && salary) {
    req.minion = {name, title, salary};
    next();
  } else {
    res.status(400).send();
  }
};

apiRouter.post('/minions', validateMinion, (req, res) => {
  const minion = addToDatabase('minions', req.minion);
  res.send(minion);
});

module.exports = apiRouter;
