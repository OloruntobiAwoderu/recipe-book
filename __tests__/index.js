const request = require("supertest");

const db = require("../data/dbConfig");
const server = require("../api/server");

describe("POST /users/register", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should return 201 when registered", async () => {
    const res = await request(server)
      .post("/users/register")
      .send({
        email: "testuser",
        password: "testpassword",
        name: "oloruntobi"
      });

    expect(res.status).toBe(201);
  });

  it("should return an item of type json when registered", async () => {
    const res = await request(server)
      .post("/users/register")
      .send({
        email: "testuser",
        password: "testpassword",
        name: "oloruntobi"
      });

    expect(res.type).toMatch(/json/i);
  });
});

describe("POST /users/register", () => {
  it("should return 200 when logged in", async () => {
    await request(server)
      .post("/users/register")
      .send({
        email: "testuser",
        password: "testpassword",
        name: "oloruntobi"
      });

    const res = await request(server)
      .post("/users/login")
      .send({
        email: "testuser",
        password: "testpassword"
      });

    expect(res.status).toBe(200);
  });

  it("should return json when logged in", async () => {
    await request(server)
      .post("/users/register")
      .send({
        email: "testuser",
        password: "testpassword",
        name: "oloruntobi"
      });

    const res = await request(server)
      .post("/users/login")
      .send({
        email: "testuser",
        password: "testpassword"
      });

    expect(res.type).toMatch(/json/i);
  });
});
