const server = require("../helper");
const fastify = server();

test("get one movie with review", async () => {
  payload = {
    review: "Kerennnnnnnnnnnn!!!!!",
  };
  await fastify.inject({
    url: "/api/review/tt0988824",
    method: "POST",
    payload,
  });

  const res = await fastify.inject({
    url: `/api/movie-and-review/tt0988824`,
    method: "GET",
  });
  expect(res.statusCode).toEqual(200);
  expect(res.json().data.Title).toBeDefined();
  expect(res.json().data.reviews).toBeDefined();
  expect(res.json().data.reviews[0].imdbID).toEqual("tt0988824");
  expect(res.json().data.reviews[0].review).toEqual(payload.review);
});

test.todo("get only movie with review");
