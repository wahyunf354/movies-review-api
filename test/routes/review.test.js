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

  expect(res.statusCode).toEqual(200);
  expect(res.json().data).toBeDefined();
  expect(res.json().data.id).toBeDefined();
  expect(res.json().data.review).toBeDefined();
  expect(res.json().data.imdbID).toBeDefined();
});

test("delete review with id", async () => {
  const resPost = await fastify.inject({
    url: "/api/review/tt0988824",
    method: "POST",
    payload: {
      review: "Kerennnnnnnnnnnn!!!!!",
    },
  });

  const res = await fastify.inject({
    method: "DELETE",
    url: `/api/review/${resPost.json().data.id}`,
  });

  expect(res.statusCode).toEqual(204);
  expect(res.json().message).toEqual("Success delete review - WARNING!");
});
test.todo("update revew with id");
test.todo("get one review");
test.todo("get one movie with review");
test.todo("get only movie with review");
