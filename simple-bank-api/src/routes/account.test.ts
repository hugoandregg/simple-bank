import request from "supertest";
import app from "../config/custom-express";
import * as typeorm from "typeorm";

describe("Account routes", () => {
  beforeEach(() => {
    Object.defineProperty(typeorm, "getCustomRepository", {
      value: jest.fn().mockReturnValue({
        findOne: jest.fn().mockResolvedValue({ id: 1, balance: 10 }),
        deposit: jest.fn().mockResolvedValue({ id: 1, balance: 12 }),
        withdraw: jest.fn().mockResolvedValue({ id: 1, balance: 8 }),
      }),
    });
  });

  it("should GET /:id/balance", async (done) => {
    const response = await request(app).get("/account/1/balance");
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should PUT /:id/deposit", async (done) => {
    const response = await request(app)
      .put("/account/1/deposit")
      .send({ value: 2 });
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should PUT /:id/withdraw", async (done) => {
    const response = await request(app)
      .put("/account/1/withdraw")
      .send({ value: 2 });
    expect(response.statusCode).toBe(200);
    done();
  });
});
