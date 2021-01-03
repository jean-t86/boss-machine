const {assert} = require('chai');
const sinon = require('sinon');
const express = require('express');
const bodyParser = require('body-parser');

const Server = require('../server.js');

describe('Server', function() {
  let server;

  beforeEach(function() {
    server = new Server(express);
  });

  afterEach(function() {

  });

  describe('Express app initialization', function() {
    it('Initializes app in constructor by calling express()', function() {
      const spyExpress = sinon.spy(express);

      server = new Server(spyExpress);

      assert.ok(spyExpress.calledOnce);
      assert.ok(server.app !== undefined);
    });
  });

  describe('Set up body-parser.json middleware', function() {
    it('app.use is called when server.setupBodyParser is called', function() {
      const mockApp = sinon.mock(server.app);
      mockApp.expects('use').once();

      server.setupBodyParser(bodyParser.json);

      mockApp.verify();
    });

    it('body-parser.json() is called inside app.use', function() {
      const spyBodyParser = sinon.spy(bodyParser.json);

      server.setupBodyParser(spyBodyParser);

      assert.ok(spyBodyParser.calledOnce);
    });
  });
});
