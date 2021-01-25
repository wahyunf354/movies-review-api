const server = require("../helper");
const fastify = server();

test("Get data naruto video from omdb api ", async () => {
  const res = await fastify.inject({
    method: "GET",
    url: "/api/video/s/naruto",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.json().data.length > 1).toBeTruthy();
  expect(res.json().data[0].Title).toBeDefined();
});

test("Get detail video with imdbID", async () => {
  const res = await fastify.inject({
    method: "GET",
    url: "/api/video/d/tt0988824",
  });

  expect(res.statusCode).toEqual(200);
  expect(res.json().data).toBeDefined();
});
