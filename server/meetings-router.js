const express = require('express');
const {
  getAllFromDatabase,
  createMeeting,
  addToDatabase,
  deleteAllFromDatabase,
} = require('./db.js');
const meetingsRouter = new express.Router();

meetingsRouter.get('/', (req, res) => {
  const meetings = getAllFromDatabase('meetings');
  res.send(meetings);
});

meetingsRouter.post('/', (req, res) => {
  const newMeeting = addToDatabase('meetings', createMeeting());
  res.send(newMeeting);
});

meetingsRouter.delete('/', (req, res) => {
  const meetings = deleteAllFromDatabase('meetings');
  if (meetings) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = meetingsRouter;
