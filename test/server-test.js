const {assert} = require('chai');
const sinon = require('sinon');
const express = require('express');

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
});
