const fetch = require("node-fetch");
const APIKEY = "2ace80b7";
const url = `http://www.omdbapi.com/?`;

module.exports = async function (fastify, opts) {
  fastify.route({
    url: "/s/:search",
    method: "GET",
    schema: {
      params: {
        type: "object",
        properties: {
          search: {
            type: "string",
          },
        },
      },
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
      const res = await fetch(`${url}apikey=${APIKEY}&s=${search}`, {
        method: "GET",
      });
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
            Title: {
              type: "string",
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { imdbID } = request.params;

      const res = await fetch(`${url}apikey=${APIKEY}&i=${imdbID}`, {
        method: "GET",
      });
      const json = await res.json();

      reply.code(200).send({ Title: "naruto" });
    },
  });
};
