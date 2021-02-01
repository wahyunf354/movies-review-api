const fetch = require("node-fetch");
const APIKEY = process.env.APIKEY;
const url = `http://www.omdbapi.com/?`;

module.exports = async function (fastify, opts) {
  fastify.route({
    url: "/s/:search",
    method: "GET",
    schema: {
      tags: ["Movies"],
      description: "Endpoint to get data movies by search",
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
      tags: ["Movies"],
      description: "Endpoint to get detail data movies by imgbID",
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
            data: {
              type: "object",
              properties: {
                Title: {
                  type: "string",
                },
                Year: {
                  type: "string",
                },
                Rated: {
                  type: "string",
                },
                Released: {
                  type: "string",
                },
                Runtime: {
                  type: "string",
                },
                Genre: {
                  type: "string",
                },
                Director: {
                  type: "string",
                },
                Writer: {
                  type: "string",
                },
                Actors: {
                  type: "string",
                },
                Plot: {
                  type: "string",
                },
                Language: {
                  type: "string",
                },
                Country: {
                  type: "string",
                },
                Awards: {
                  type: "string",
                },
                Poster: {
                  type: "string",
                },
                Ratings: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      Source: { type: "string" },
                      Value: { type: "string" },
                    },
                  },
                },
                Metascore: {
                  type: "string",
                },
                imdbRating: {
                  type: "string",
                },
                imdbVotes: {
                  type: "string",
                },
                imdbID: {
                  type: "string",
                },
                Type: {
                  type: "string",
                },
                totalSeasons: {
                  type: "string",
                },
                Response: {
                  type: "string",
                },
              },
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
      reply.code(200).send({ data: json });
    },
  });
};
