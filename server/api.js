const express = require('express');
const {
  getAllFromDatabase,
  getFromDatabaseById,
} = require('./db.js');
const apiRouter = new express.Router();

apiRouter.get('/minions', (req, res) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).json({minions});
});

apiRouter.get('/minions/:minionId', (req, res) => {
  const id = req.params.minionId;
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    res.status(200).json(minion);
  } else {
    res.status(404).json();
  }
});

  } else {
    res.status(404).send();
  }
});

module.exports = apiRouter;
