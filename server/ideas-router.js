const express = require('express');
const {getAllFromDatabase, addToDatabase} = require('./db.js');
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

module.exports = ideasRouter;
