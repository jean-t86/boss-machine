const {assert} = require('chai');
const sinon = require('sinon');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const apiRouter = require('../server/api.js');
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

  describe('Set up cors middleware', function() {
    it('app.use is called when server.setupCors is called', function() {
      const mockApp = sinon.mock(server.app);
      mockApp.expects('use').once();

      server.setupCors();

      mockApp.verify();
    });

    it('app.use is called with cors as argument', function() {
      const mockApp = sinon.mock(server.app);
      mockApp.expects('use').once().withArgs(cors);

      server.setupCors(cors);

      mockApp.verify();
    });
  });

  describe('Set up morgan middleware', function() {
    it('app.use is called when server.setupMorgan is called', function() {
      const mockApp = sinon.mock(server.app);
      mockApp.expects('use').once();

      server.setupMorgan(morgan, 'combined');

      mockApp.verify();
    });

    it('morgan is called with format combined', function() {
      const spyMorgan = sinon.spy(morgan);
      const format = 'combined';
      server.setupMorgan(spyMorgan, format);

      assert.ok(spyMorgan.calledOnce);
      assert.strictEqual(format, spyMorgan.getCall(0).args[0]);
    });
  });

  describe('Mount API router', function() {
    it('app.use is called when server.mountApiRouter is called', function() {
      const mockApp = sinon.mock(server.app);
      mockApp.expects('use').once();

      server.mountRouter('', null);

      mockApp.verify();
    });

    it('app.use is called with the route and apiRouter', function() {
      const spyApp = sinon.spy(server.app, 'use');

      server.mountRouter('/api', apiRouter);

      assert.ok(spyApp.calledOnce);
      assert.strictEqual('/api', spyApp.getCall(0).args[0]);
      assert.strictEqual(apiRouter, spyApp.getCall(0).args[1]);
    });
  });
});
