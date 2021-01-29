"use strict";
const Fastify = require("fastify");
const fp = require("fastify-plugin");
const App = require("../app");

const queryClearTable = "DELETE FROM movies_review";

const server = () => {
  // setup envaronment
  process.env.DB_POSTGRES =
    "postgres://movies_pg:localhost@localhost:4000/movies_review_test";
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
