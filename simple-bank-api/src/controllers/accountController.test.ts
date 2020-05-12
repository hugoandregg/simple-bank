import { balance, deposit, withdraw } from "./accountController";
import { Request } from "express";

import * as typeorm from "typeorm";

jest.mock("../repository/AccountRepository");

const accountRepositoryMock = require("../repository/AccountRepository");

describe("Account Controller", () => {
  let request: any;
  let response: any;

  beforeEach(() => {
    Object.defineProperty(typeorm, "getCustomRepository", {
      value: jest.fn().mockReturnValue(accountRepositoryMock),
    });

    request = {} as Request;
    response = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
      locals: { jwtPayload: { userId: 1 } },
    };
  });

  describe("balance", () => {
    it("should call findOneOrFail", async () => {
      accountRepositoryMock.findOneOrFail = jest
        .fn()
        .mockResolvedValue(undefined);

      await balance(request, response);

      expect(accountRepositoryMock.findOneOrFail).toHaveBeenCalled();
    });

    it("should respond with status 200 when there is an account with given id", async () => {
      accountRepositoryMock.findOneOrFail = jest
        .fn()
        .mockResolvedValue(undefined);

      await balance(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
    });

    it("should respond with account data when there is an account with given id", async () => {
      const account = { id: 1, balance: 10 };
      accountRepositoryMock.findOneOrFail = jest
        .fn()
        .mockResolvedValue(account);

      await balance(request, response);

      expect(response.status().json).toHaveBeenCalledWith(account);
    });

    it("should respond with status 404 when there is an error", async () => {
      accountRepositoryMock.findOneOrFail = jest
        .fn()
        .mockRejectedValue(new Error());

      await balance(request, response);

      expect(response.status).toHaveBeenCalledWith(404);
    });
  });

  describe("Deposit", () => {
    beforeEach(() => {
      request = request = {
        params: { id: 1 } as Object,
        body: { value: 2 },
      } as Request;
      accountRepositoryMock.findOneOrFail = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    it("should call findOneOrFail", async () => {
      await deposit(request, response);

      expect(accountRepositoryMock.findOneOrFail).toHaveBeenCalledWith(1);
    });

    it("should call deposit", async () => {
      accountRepositoryMock.deposit = jest.fn().mockResolvedValue(undefined);

      await deposit(request, response);

      expect(accountRepositoryMock.findOneOrFail).toHaveBeenCalledWith(1);
    });

    it("should respond with status 200 when depositing in an account with given id", async () => {
      accountRepositoryMock.deposit = jest.fn().mockResolvedValue(undefined);

      await deposit(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
    });

    it("should respond with account data when depositing an account with given id", async () => {
      const account = { id: 1, balance: 10 };
      accountRepositoryMock.deposit = jest.fn().mockResolvedValue(account);

      await deposit(request, response);

      expect(response.status().json).toHaveBeenCalledWith(account);
    });

    it("should respond with status 500 when there is an error depositing value", async () => {
      accountRepositoryMock.deposit = jest.fn().mockRejectedValue(new Error());

      await deposit(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
    });

    it("should respond with status 404 when there is an account with given id", async () => {
      accountRepositoryMock.findOneOrFail = jest
        .fn()
        .mockRejectedValue(new Error());

      await deposit(request, response);

      expect(response.status).toHaveBeenCalledWith(404);
    });
  });

  describe("Withdraw", () => {
    beforeEach(() => {
      request = request = {
        params: { id: 1 } as Object,
        body: { value: 2 },
      } as Request;
      accountRepositoryMock.findOneOrFail = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    it("should call findOneOrFail", async () => {
      await withdraw(request, response);

      expect(accountRepositoryMock.findOneOrFail).toHaveBeenCalledWith(1);
    });

    it("should call withdraw", async () => {
      accountRepositoryMock.withdraw = jest.fn().mockResolvedValue(undefined);

      await withdraw(request, response);

      expect(accountRepositoryMock.findOneOrFail).toHaveBeenCalledWith(1);
    });

    it("should respond with status 200 when withdrawing in an account with given id", async () => {
      accountRepositoryMock.withdraw = jest.fn().mockResolvedValue(undefined);

      await withdraw(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
    });

    it("should respond with account data when withdrawing an account with given id", async () => {
      const account = { id: 1, balance: 10 };
      accountRepositoryMock.withdraw = jest.fn().mockResolvedValue(account);

      await withdraw(request, response);

      expect(response.status().json).toHaveBeenCalledWith(account);
    });

    it("should respond with status 500 when there is an error withdrawing value", async () => {
      accountRepositoryMock.withdraw = jest.fn().mockRejectedValue(new Error());

      await withdraw(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
    });

    it("should respond with status 404 when there is an account with given id", async () => {
      accountRepositoryMock.findOneOrFail = jest
        .fn()
        .mockRejectedValue(new Error());

      await withdraw(request, response);

      expect(response.status).toHaveBeenCalledWith(404);
    });
  });
});
