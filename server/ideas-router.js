const express = require('express');
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db.js');
const ideasRouter = new express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

ideasRouter.get('/', (req, res) => {
  const ideas = getAllFromDatabase('ideas');
  res.send(ideas);
});

const validateIdea = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const numWeeks = Number(req.body.numWeeks);
  const weeklyRevenue = Number(req.body.weeklyRevenue);

  if (typeof name !== 'undefined' &&
  typeof description !== 'undefined' &&
  typeof numWeeks !== 'undefined' &&
  typeof weeklyRevenue !== 'undefined') {
    req.name = name;
    req.description = description;
    req.numWeeks = numWeeks;
    req.weeklyRevenue = weeklyRevenue;
    next();
  } else {
    res.status(400).send();
  }
};

ideasRouter.post('/', validateIdea, checkMillionDollarIdea, (req, res) => {
  const idea = addToDatabase('ideas', {
    name: req.name,
    description: req.description,
    numWeeks: req.numWeeks,
    weeklyRevenue: req.weeklyRevenue,
  });
  res.status(201).send(idea);
});

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
  const idea = getFromDatabaseById('ideas', ideaId);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get('/:ideaId', (req, res) => {
  res.send(req.idea);
});

ideasRouter.put(
    '/:ideaId',
    validateIdea,
    checkMillionDollarIdea,
    (req, res) => {
      req.idea.name = req.name;
      req.idea.description = req.description;
      req.idea.numWeeks = req.numWeeks;
      req.idea.weeklyRevenue = req.weeklyRevenue;
      const idea = updateInstanceInDatabase('ideas', req.idea);
      res.send(idea);
    },
);

ideasRouter.delete('/:ideaId', (req, res) => {
  const deleted = deleteFromDatabasebyId('ideas', req.idea.id);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;
