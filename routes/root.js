"use strict";

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Check"],
    },
    handler: (req, reply) => {
      return { status: "OK" };
    },
  });
};
