const express = require('express');
const {getAllFromDatabase, createMeeting, addToDatabase} = require('./db.js');
const meetingsRouter = new express.Router();

meetingsRouter.get('/', (req, res) => {
  const meetings = getAllFromDatabase('meetings');
  res.send(meetings);
});

meetingsRouter.post('/', (req, res) => {
  const newMeeting = addToDatabase('meetings', createMeeting());
  res.send(newMeeting);
});

module.exports = meetingsRouter;
