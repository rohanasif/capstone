const request = require("supertest");
const app = require('../website/server/index');

describe("Test the '/all' path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app)
          .get("/all");
      expect(response.statusCode).toBe(200);
  });
});