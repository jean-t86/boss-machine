const express = require('express');
const Server = require('./server.js');

Server.run(new Server(express), process.env.PORT || 4001);
