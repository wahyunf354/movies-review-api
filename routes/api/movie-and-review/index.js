const fetch = require("node-fetch");
const APIKEY = process.env.APIKEY;
const url = `http://www.omdbapi.com/?`;

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/:imdbID",
    schema: {
      tags: ["Movie and Review"],
      description: "endpoint to get one movie with review",
      params: {
        type: "object",
        required: ["imdbID"],
        properties: {
          imdbID: {
            type: "string",
          },
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
                reviews: {
                  type: "array",
                },
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { imdbID } = request.params;
      // get a data movie from rest API
      const resAPI = await fetch(`${url}apikey=${APIKEY}&i=${imdbID}`, {
        method: "GET",
      });
      const resultAPI = await resAPI.json();
      // get data review from database
      const client = await fastify.pg.connect();
      const {
        rows,
      } = await client.query("SELECT * FROM movies_review WHERE imdbid=$1", [
        imdbID,
      ]);
      client.release();
      rows.forEach((e) => {
        e.imdbID = e.imdbid;
        delete e.imdbid;
      });
      reply.code(200).send({
        data: { ...resultAPI, reviews: rows },
      });
    },
  });

  fastify.route({
    url: "/",
    method: "GET",
    schema: {
      tags: ["Movie and Review"],
      description: "Endpoint to get all movie with review it",
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
                  reviews: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        review: { type: "string" },
                        created_at: { type: "string", format: "date" },
                        updated_at: { type: "string", format: "date" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      // TODO: sampai sini
    },
  });
};
