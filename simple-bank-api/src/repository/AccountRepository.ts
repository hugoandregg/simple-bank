import { Repository, EntityRepository } from "typeorm";
import { Account } from "../entity/Account";

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async deposit(account: Account, value: number): Promise<Account> {
    account.balance += Number(value);

    return await this.save(account);
  }

  async withdraw(account: Account, value: number): Promise<Account> {
    if (this.isValueEqualOrLessThanBalance(account.balance, value)) {
      throw new Error("Balance not enough to withdraw this value.");
    }

    account.balance -= Number(value);

    return await this.save(account);
  }

  private isValueEqualOrLessThanBalance(balance, value) {
    if (balance - value >= 0) {
      return false;
    }
    return true;
  }
}
