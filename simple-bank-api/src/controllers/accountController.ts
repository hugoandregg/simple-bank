import { getRepository } from "typeorm";
import { Account } from "../entity/Account";

export const balance = async (req, res) => {
    const id = req.params.id;
    const balance = await getRepository(Account).findOne(id);
    
    console.log(balance);
    res.status(200).send(balance);
}

export const deposit = async (req, res) => {
    const id = req.params.id;
    const depositValue = req.body.value;

    const accountRepository = getRepository(Account);
    await accountRepository.increment({id: id}, "balance", depositValue);
    const balance = await accountRepository.findOne(id);

    console.log(balance);
    res.status(200).send(balance);
}

export const withdraw = async (req, res) => {
    const id = req.params.id;
    const depositValue = req.body.value;

    const accountRepository = getRepository(Account);
    await accountRepository.decrement({id: id}, "balance", depositValue);
    const balance = await accountRepository.findOne(id);

    console.log(balance);
    res.status(200).send(balance);
}
