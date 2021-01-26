const server = require("../helper");
const fastify = server();

test("Get data naruto movies from omdb api ", async () => {
  const res = await fastify.inject({
    method: "GET",
    url: "/api/movies/s/naruto",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.json().data.length > 1).toBeTruthy();
  expect(res.json().data[0].Title).toBeDefined();
});

test("Get detail movies with imdbID", async () => {
  const res = await fastify.inject({
    method: "GET",
    url: "/api/movies/d/tt0988824",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.json().Title).toBeDefined();
});
