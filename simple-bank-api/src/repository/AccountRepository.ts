import { Repository, EntityRepository } from "typeorm";
import { Account } from "../entity/Account";

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  deposit(account: Account, value: number): Promise<Account> {
    return new Promise((resolve, reject) => {
      account.balance += Number(value);
      this.save(account)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  withdraw(account: Account, value: number): Promise<Account> {
    return new Promise((resolve, reject) => {
      if (this.isValueEqualOrLessThanBalance(account.balance, value)) {
        return reject("Balance not enough to withdraw this value.")
      }
      account.balance -= Number(value);
      this.save(account)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private isValueEqualOrLessThanBalance(balance, value) {
    if (balance - value >= 0) {
      return false;
    }
    return true;
  }
}
