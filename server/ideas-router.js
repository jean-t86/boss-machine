const express = require('express');
const {getAllFromDatabase} = require('./db.js');
const ideasRouter = new express.Router();

ideasRouter.get('/', (req, res) => {
  const ideas = getAllFromDatabase('ideas');
  res.send(ideas);
});

module.exports = ideasRouter;
