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
              required: ["id", "review", "imdbID"],
              properties: {
                id: { type: "number" },
                imdbID: { type: "string" },
                review: { type: "string" },
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
      reply.code(200).send({
        data: {
          id: result.rows[0].id,
          imdbID,
          review,
        },
      });
    },
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      tags: ["Review Movie"],
      description:
        "endpoint to delete review movie - WARNING - Delete is permanent",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
        },
      },
      response: {
        204: {
          type: "object",
          required: ["message"],
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const client = await fastify.pg.connect();

      await client.query("DELETE FROM movies_review WHERE id=$1", [id]);
      client.release();
      reply.code(204).send({
        message: "Success delete review - WARNING!",
      });
    },
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: {
      tags: ["Review Movie"],
      description: "endpoint to update review movie",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
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
          required: ["data", "message"],
          properties: {
            message: { type: "string" },
            data: {
              type: "object",
              required: ["id", "review", "imdbID"],
              properties: {
                id: { type: "number" },
                imdbID: { type: "string" },
                review: { type: "string" },
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const { review } = request.body;
      const client = await fastify.pg.connect();

      const {
        rows,
      } = await client.query(
        "UPDATE movies_review SET review=$1, updated_at=CURRENT_TIMESTAMP WHERE id=$2 RETURNING imdbID",
        [review, id]
      );
      client.release();
      reply.code(200).send({
        message: "Success update review",
        data: {
          id,
          imdbID: rows[0].imdbid,
          review,
        },
      });
    },
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: {
      tags: ["Review Movie"],
      description: "endpoint to get one review movie by id",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
        },
      },
      response: {
        200: {
          type: "object",
          required: ["data"],
          properties: {
            data: {
              type: "object",
              properties: {
                id: { type: "number" },
                imdbID: { type: "string" },
                review: { type: "string" },
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const client = await fastify.pg.connect();

      const {
        rows,
      } = await client.query("SELECT * FROM movies_review WHERE id=$1", [id]);
      const { imdbid: imdbID, review } = rows[0];
      client.release();
      reply.code(200).send({
        data: {
          id,
          imdbID,
          review,
        },
      });
    },
  });
};
