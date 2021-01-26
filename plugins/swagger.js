"use strict";

const fp = require("fastify-plugin");
module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-swagger"), {
    routerPrefix: "/documentation",
    swagger: {
      info: {
        title: "Rest API Movies Review",
        description:
          "project akhir yang dibuat untuj mengakhiri kegiatan mentorship",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://github.com/wahyunf354/movies-review-api",
        description: "Untuk mengetahui lebih lanjut tetang project",
      },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["aplication/json"],
      produces: ["aplication/json"],
    },
    exposeRoute: true,
  });
});
