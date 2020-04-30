import { getRepository } from "typeorm";
import { Account } from "../entity/Account";

export const balance = async (req, res) => {
    const accountRepository = getRepository(Account);
    const accounts = await accountRepository.find();
    console.log(accounts);
    res.send(accounts);
}
