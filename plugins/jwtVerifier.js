"use strict";

const fp = require("fastify-plugin");
const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.URL_ISSUER,
  clientId: process.env.CLIENT_ID,
});

module.exports = fp(async function (fastify, opts) {
  fastify.decorate("jwtVerifier", async function (request, reply) {
    const { authorization } = request.headers;

    if (!authorization) {
      reply.code(401).send();
    }

    const [authType, token] = authorization.trim().split(" ");
    try {
      const { claims } = await oktaJwtVerifier.verifyAccessToken(
        token,
        process.env.OKTA_AUDIENCE
      );

      if (!claims) {
        reply.code(401).send();
      }

      if (!claims.scp.includes("api")) {
        reply.code(401).send();
      }
    } catch (error) {
      console.log(error);
      reply.code(401).send();
    }
  });
});
