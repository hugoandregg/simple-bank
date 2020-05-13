import {
  EntityRepository,
  Repository,
  getRepository,
  UpdateResult,
} from "typeorm";
import { User } from "../entity/User";
import { Account } from "../entity/Account";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async saveUserWithAccount(user: User): Promise<User> {
    await this.save(user)
      .then(async (user) => {
        await getRepository(Account).save({
          balance: 0.0,
          user,
        });

        return user;
      })
      .catch((error) => {
        throw new Error(error);
      });

    return;
  }
}
