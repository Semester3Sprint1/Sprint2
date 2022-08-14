const request = require("supertest");
let server;

describe("/movies/mongo", () => {
  beforeEach(() => {
    server = require("../server");
  });
  afterEach(() => {
    server.close();
  });
  describe("GET /", () => {
    it("should return all movies", async () => {
      const res = await request(server).get("/movies/mongo");
      expect(res.status).toBe(200);
      expect(
        res.body.some((m) => m.title === "Nanook of the North")
      ).toBeTruthy();
    });
  });

  describe("GET /:genre", () => {
    it("should return movies by genre if valid genre is passed", async () => {
      const genre = "Horror";
      const res = await request(server).get("/movies/mongo/" + genre);
      expect(res.status).toBe(200);
      expect(res.body.some((m) => m.genres.includes(genre))).toBeTruthy();
    });
  });
});
