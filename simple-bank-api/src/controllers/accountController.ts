import { getRepository } from "typeorm";
import { Account } from "../entity/Account";
import { check, validationResult } from "express-validator";

export const balance = async (req, res) => {
  const id = req.params.id;
  await getRepository(Account)
    .findOne(id)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((errors) => {
      console.log(errors);
      res.status(404).json("Account not found");
    });
};

export const deposit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.id;
  const depositValue = req.body.value;

  const accountRepository = getRepository(Account);
  await accountRepository
    .increment({ id: id }, "balance", depositValue)
    .then(async (result) => {
      console.log(result);
      res.redirect(200, process.env.BASE_URL + "/account/balance/" + id);
    })
    .catch((errors) => {
      console.log(errors);
      res.status(404).json("Account not found");
    });
};

export const withdraw = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.id;
  const depositValue = req.body.value;

  const accountRepository = getRepository(Account);
  await accountRepository
    .decrement({ id: id }, "balance", depositValue)
    .then(async (result) => {
      console.log(result);
      res.redirect(200, process.env.BASE_URL + "/account/balance/" + id);
    })
    .catch((errors) => {
      console.log(errors);
      res.status(404).json("Account not found");
    });
};

export const validate = [
  check("value", "Value field is required").exists(),
  check("value", "Value should be greater than 0").isFloat({ gt: 0 }),
];
