const express = require('express');
const Server = require('../server.js');
const request = require('supertest');
const {assert, expect} = require('chai');

describe('Boss Machine API', function() {
  let server;
  const port = process.env.PORT || 4001;

  beforeEach(function() {
    server = new Server(express);
    Server.run(server, port);
  });

  afterEach(function(done) {
    server.close(done);
  });

  describe('GET all minions', function() {
    it('returns status code 200', function(done) {
      request(server.expressApp)
          .get('/api/minions')
          .expect(200, done);
    });

    it('returns all minions from the db', function() {
      request(server.expressApp)
          .get('/api/minions')
          .expect(200)
          .then((res) => {
            assert.ok(res.body.length > 0);
            expect(res.body).to.be.an.instanceOf(Array);
            res.body.forEach((minion) => {
              expect(minion).to.have.ownProperty('id');
              expect(minion).to.have.ownProperty('name');
              expect(minion).to.have.ownProperty('title');
              expect(minion).to.have.ownProperty('salary');
              expect(minion).to.have.ownProperty('weaknesses');
            });
          });
    });
  });
});
