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

  it("should return 200 when calling GET balance route", async done => {
    const response = await request(app).get("/account/1/balance");
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should return 200 when calling PUT deposit route", async done => {
    const response = await request(app)
      .put("/account/1/deposit")
      .send({ value: 2 });
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should return 422 when passing invalid arguments to deposit route", async done => {
    const response = await request(app)
      .put("/account/1/deposit")
      .send({ value: -1 });

    expect(response.statusCode).toBe(422);
    done();
  });

  it("should return error message when passing invalid arguments to deposit route", async done => {
    const response = await request(app)
      .put("/account/1/deposit")
      .send({ value: -1 });

    const result = JSON.parse(response.text);
    expect(result.errors[0].msg).toBe("Value should be greater than 0");
    done();
  });

  it("should return error message when not passing value argument to deposit route", async done => {
    const response = await request(app).put("/account/1/deposit").send({});

    const result = JSON.parse(response.text);
    expect(result.errors[0].msg).toBe("Value field is required");
    done();
  });

  it("should return 200 when calling PUT withdraw route", async done => {
    const response = await request(app)
      .put("/account/1/withdraw")
      .send({ value: 2 });
    expect(response.statusCode).toBe(200);
    done();
  });

  it("should return 422 when passing invalid arguments to withdraw route", async done => {
    const response = await request(app)
      .put("/account/1/withdraw")
      .send({ value: -1 });

    expect(response.statusCode).toBe(422);
    done();
  });

  it("should return error message when passing invalid arguments to withdraw route", async done => {
    const response = await request(app)
      .put("/account/1/withdraw")
      .send({ value: -1 });

    const result = JSON.parse(response.text);
    expect(result.errors[0].msg).toBe("Value should be greater than 0");
    done();
  });

  it("should return error message when not passing value argument to withdraw route", async done => {
    const response = await request(app).put("/account/1/withdraw").send({});

    const result = JSON.parse(response.text);
    expect(result.errors[0].msg).toBe("Value field is required");
    done();
  });
});
