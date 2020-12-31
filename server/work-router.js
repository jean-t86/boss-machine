const express = require('express');
const {
  getAllWorkByMinionId,
  addToDatabase,
  updateInstanceInDatabase,
} = require('./db.js');
const workRouter = new express.Router({mergeParams: true});

workRouter.get('/', (req, res) => {
  const allWorkForMinion = getAllWorkByMinionId(req.minion.id);
  res.send(allWorkForMinion);
});

const validateWork = (req, res, next) => {
  const title = req.query.title;
  const description = req.query.description;
  const hours = Number(req.query.hours);
  if (title && description && hours) {
    req.title = title;
    req.description = description;
    req.hours = hours;
    next();
  } else {
    res.status(400).send();
  }
};

workRouter.post('/', validateWork, (req, res) => {
  const newWork = addToDatabase('work',
      {
        title: req.title,
        description: req.description,
        hours: req.hours,
        minionId: req.minion.id,
      });
  res.send(newWork);
});

workRouter.param('workId', (req, res, next, workId) => {
  const allWorkForMinion = getAllWorkByMinionId(req.minion.id);
  const work = allWorkForMinion.filter((element) => element.id === workId);
  if (work) {
    req.work = work[0];
    next();
  } else {
    res.status(404).send();
  }
});

workRouter.put('/:workId', validateWork, (req, res) => {
  req.work.title = req.title;
  req.work.description = req.description;
  req.work.hours = req.hours;
  const work = updateInstanceInDatabase('work', req.work);
  if (work) {
    res.send(work);
  } else {
    res.status(404).send();
  }
});

module.exports = workRouter;
