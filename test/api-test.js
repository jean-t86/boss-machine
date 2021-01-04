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

  describe('GET a minion by id', function() {
    it('returns status code 200', function(done) {
      request(server.expressApp)
          .get('/api/minions/1')
          .expect(200, done);
    });

    it('returns the minion with id minionId', function() {
      request(server.expressApp)
          .get('/api/minions/1')
          .expect(200)
          .then((res) => {
            assert.ok(res.body.minion);
            const minion = res.body;
            expect(minion).to.have.ownProperty('id');
            expect(minion).to.have.ownProperty('name');
            expect(minion).to.have.ownProperty('title');
            expect(minion).to.have.ownProperty('salary');
            expect(minion).to.have.ownProperty('weaknesses');
          });

      it('returned minion has the correct id', function() {
        const id = '4';
        request(server.expressApp)
            .get(`/api/minions/${id}`)
            .expect(200)
            .then((res) => {
              const minion = res.body;
              assert.strictEqual(minion.id, id);
            });
      });

      it('returns 404 if minion with id cannot be found', function() {
        request(server.expressApp)
            .get('/api/minions/35')
            .expect(404);
      });

      it('resturns 404 if the id is a string', function(done) {
        request(server.expressApp)
            .get('/api/minion/adei')
            .expect(404, done);
      });
    });
  });

  describe('POST a new minion', function() {
    const minion = {
      name: 'Bob',
      title: 'Chief',
      weaknesses: 'None',
      salary: 10000,
    };

    const invalidMinion = {
      name: '',
      title: '',
      weaknesses: '',
      salary: null,
    };

    it('returns status code 201', function(done) {
      request(server.expressApp)
          .post('/api/minions')
          .send(minion)
          .expect(201, done);
    });

    it('creates new minion and returns it with status 201', async function() {
      const postRes = await request(server.expressApp)
          .post('/api/minions')
          .send(minion)
          .expect(201);
      const newMinion = postRes.body;

      const getRes = await request(server.expressApp)
          .get(`/api/minions/${newMinion.id}`)
          .expect(200);
      const insertedMinion = getRes.body;

      assert.strictEqual(insertedMinion.id, newMinion.id);
    });

    it('returns 404 if an invalid minion is sent through', function(done) {
      request(server.expressApp)
          .post('/api/minions')
          .send(invalidMinion)
          .expect(400, done);
    });

    it('returns a minion with an id', function() {
      request(server.expressApp)
          .post('/api/minions')
          .send(minion)
          .expect(201)
          .then((res) => {
            const minion = res.body;
            expect(minion).to.have.own.property('id');
            assert.ok(minion.id !== undefined);
          });
    });
  });
});
