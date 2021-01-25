const fetch = require("node-fetch");
const APIKEY = "2ace80b7";

module.exports = async function (fastify, opts) {
  fastify.route({
    url: "/s/:search",
    method: "GET",
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  Title: { type: "string" },
                  Year: { type: "string" },
                  imdbID: { type: "string" },
                  Poster: { type: "string" },
                  Type: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { search } = request.params;
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${APIKEY}&s=${search}`,
        {
          method: "GET",
        }
      );
      const json = await res.json();
      reply.code(200).send({ data: json.Search });
    },
  });

  fastify.route({
    url: "/d/:imdbID",
    method: "GET",
    schema: {
      params: {
        type: "object",
        properties: {
          imdbID: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            Title: { type: "string" },
          },
        },
      },
    },
    handler: async (request, reply) => {},
  });
};
