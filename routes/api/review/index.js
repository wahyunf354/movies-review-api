module.exports = async function (fastify, opts) {
  fastify.route({
    method: "POST",
    url: "/:imdbID",
    schema: {
      tags: ["Review Movie"],
      description: "endpoint to create review movie",
      params: {
        type: "object",
        required: ["imdbID"],
        properties: {
          imdbID: { type: "string" },
        },
      },
      body: {
        type: "object",
        required: ["review"],
        properties: {
          review: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          required: ["data"],
          properties: {
            data: {
              type: "object",
              required: ["id"],
              properties: {
                id: { type: "number" },
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { imdbID } = request.params;
      const { review } = request.body;
      const client = await fastify.pg.connect();

      const result = await client.query(
        "INSERT INTO movies_review(imdbID, review) VALUES ($1, $2) RETURNING id;",
        [imdbID, review]
      );
      client.release();
      reply.code(200).send({ data: { id: result.rows[0].id } });
    },
  });
};
