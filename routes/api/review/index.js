module.exports = async function (fastify, opts) {
  const client = await fastify.pg.connect();

  fastify.route({
    method: "POST",
    url: "/:imdbID",
    schema: {
      tags: ["Review Movie"],
      description: "endpoint to create review movie",
      params: {
        type: "object",
        properties: {
          imdbID: { type: "string" },
        },
      },
    },
    handler: async (request, reply) => {
      const { imdbID } = request.params;
      const { review } = request.body;
      const { id } = await client.query(
        `INSERT INTO movies_review(imdbID, review) VALUES (${imdbID}, ${review}) RETURNING id;`
      );
      client.release();
      reply.code(200).send({ data: id });
    },
  });
};
