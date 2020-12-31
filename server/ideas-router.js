const express = require('express');
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db.js');
const ideasRouter = new express.Router();

ideasRouter.get('/', (req, res) => {
  const ideas = getAllFromDatabase('ideas');
  res.send(ideas);
});

const validateIdea = (req, res, next) => {
  const name = req.query.name;
  const description = req.query.description;
  const numWeeks = Number(req.query.numWeeks);
  const weeklyRevenue = Number(req.query.weeklyRevenue);

  if (name && description && numWeeks && weeklyRevenue) {
    req.name = name;
    req.description = description;
    req.numWeeks = numWeeks;
    req.weeklyRevenue = weeklyRevenue;
    next();
  } else {
    res.status(400).send();
  }
};

ideasRouter.post('/', validateIdea, (req, res) => {
  const idea = addToDatabase('ideas', {
    name: req.name,
    description: req.description,
    numWeeks: req.numWeeks,
    weeklyRevenue: req.weeklyRevenue,
  });
  res.send(idea);
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

ideasRouter.put('/:ideaId', validateIdea, (req, res) => {
  req.idea.name = req.name;
  req.idea.description = req.description;
  req.idea.numWeeks = req.numWeeks;
  req.idea.weeklyRevenue = req.weeklyRevenue;
  const idea = updateInstanceInDatabase('ideas', req.idea);
  res.send(idea);
});

ideasRouter.delete('/:ideaId', (req, res) => {
  const deleted = deleteFromDatabasebyId('ideas', req.idea.id);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;
