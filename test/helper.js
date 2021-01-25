"use strict";

// This file contains code that we reuse
// between our tests.

const Fastify = require("fastify");
const fp = require("fastify-plugin");
const App = require("../app");

const server = () => {
  // setup envaronment
  // setup server fastify
  const app = Fastify({
    logger: {
      level: process.env.LOGGER_LEVEL || "silent",
    },
    pluginTimeout: 2 * 60 * 1000,
  });
  // setup lifecycle
  beforeAll(async () => {
    app.register(fp(App));
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  return app;
};

module.exports = server;
