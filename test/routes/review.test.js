const server = require("../helper");
const fastify = server();

test("create a review movies with imdbID tt0988824", async () => {
  const res = await fastify.inject({
    url: "/api/review/tt0988824",
    method: "POST",
    payload: {
      review: "Kerennnnnnnnnnnn!!!!!",
    },
  });
  console.warn(res.json());
  expect(res.statusCode).toEqual(200);
});
