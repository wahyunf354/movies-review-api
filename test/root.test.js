const server = require("./helper");
const fastify = server();

test("test healty Rest API", async () => {
  const res = await fastify.inject({
    url: "/",
    method: "GET",
  });

  expect(res.json().status).toEqual("OK");
});
