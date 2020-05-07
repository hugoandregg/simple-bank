import { AccountRepository } from "./AccountRepository";

describe("Account Repository", () => {
  let accountRepository;
  let account;
  let balance;
  let value;
  let valueBiggerThanExpected;

  beforeEach(() => {
    balance = 10;
    account = { id: 1, balance };
    accountRepository = new AccountRepository();
    accountRepository.save = jest.fn().mockResolvedValue(account);
    value = 2;
    valueBiggerThanExpected = 10.1;
  });

  describe("Deposit", () => {
    it("should call save method", async () => {
      await accountRepository.deposit(account, value);

      expect(accountRepository.save).toHaveBeenCalled();
    });

    it("should deposit the exact amount", async () => {
      const result = await accountRepository.deposit(account, value);

      expect(result.balance).toBe(balance + value);
    });
  });

  describe("Withdraw", () => {
    it("should call save method", async () => {
      await accountRepository.withdraw(account, value);

      expect(accountRepository.save).toHaveBeenCalled();
    });

    it("should withdraw the exact amount", async () => {
      const result = await accountRepository.withdraw(account, value);

      expect(result.balance).toBe(balance - value);
    });

    it("should return balance 0 when withdrawing the exact balance value", async () => {
      const result = await accountRepository.withdraw(account, account.balance);

      expect(result.balance).toBe(0);
    });

    it("should not call save method when value is bigger than balance", async () => {
      try {
        await accountRepository.withdraw(account, value);
      } catch (error) {
        expect(accountRepository.save).not.toHaveBeenCalled();
      }
    });

    it("should return an error message when value is bigger than balance", async () => {
      try {
        await accountRepository.withdraw(account, value);
      } catch (error) {
        expect(error.message).toBe(
          "Balance not enough to withdraw this value."
        );
      }
    });
  });
});
