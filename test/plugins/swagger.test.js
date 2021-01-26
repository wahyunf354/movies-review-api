const server = require("../helper");
const fastify = server();

test("endpoint documentation with swagger", async () => {
  const res = await fastify.inject({
    method: "GET",
    url: "/documentation/json",
  });

  expect(res.json().info.title).toEqual("Rest API Movies Review");
});
