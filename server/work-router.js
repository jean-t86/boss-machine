const express = require('express');
const {
  getAllWorkByMinionId,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db.js');
const workRouter = new express.Router({mergeParams: true});

workRouter.get('/', (req, res) => {
  const allWorkForMinion = getAllWorkByMinionId(req.minion.id);
  res.send(allWorkForMinion);
});

const validateWork = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const hours = Number(req.body.hours);
  const minionId = req.body.minionId;
  if (typeof title !== 'undefined' &&
  typeof description !== 'undefined' &&
  typeof hours !== 'undefiend' &&
  typeof minionId !== 'undefiend') {
    req.title = title;
    req.description = description;
    req.hours = hours;
    req.minionId = minionId;
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
  res.status(201).send(newWork);
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
  if (req.minionId === req.minion.id) {
    req.work.title = req.title;
    req.work.description = req.description;
    req.work.hours = req.hours;
    req.work.minionId = req.minionId;
    const work = updateInstanceInDatabase('work', req.work);
    if (work) {
      res.send(work);
    } else {
      res.status(404).send();
    }
  } else {
    res.status(400).send();
  }
});

workRouter.delete('/:workId', (req, res) => {
  const deleted = deleteFromDatabasebyId('work', req.work.id);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = workRouter;
