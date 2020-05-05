import request from "supertest";
import app from "./../config/custom-express";

describe("Get Hello World", () => {
  it("Hello API request", async (done) => {
    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("pass!");
    done();
  });
});
