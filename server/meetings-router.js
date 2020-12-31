const express = require('express');
const {getAllFromDatabase} = require('./db.js');
const meetingsRouter = new express.Router();

meetingsRouter.get('/', (req, res) => {
  const meetings = getAllFromDatabase('meetings');
  res.send(meetings);
});

module.exports = meetingsRouter;
