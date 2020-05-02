import { getRepository } from "typeorm";
import { Account } from "../entity/Account";
import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const balance = async (req: Request, res: Response) => {
  const id = req.params.id;
  await getRepository(Account)
    .findOne(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(404).json("Account not found");
    });
};

export const deposit = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const depositValue = req.body.value;

  const accountRepository = getRepository(Account);
  await accountRepository
    .increment({ id }, "balance", depositValue)
    .then(async () => {
      res.redirect(200, `${process.env.BASE_URL}/account/balance/${id}`);
    })
    .catch(() => {
      res.status(404).json("Account not found");
    });
};

export const withdraw = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const depositValue = req.body.value;

  const accountRepository = getRepository(Account);
  await accountRepository
    .decrement({ id }, "balance", depositValue)
    .then(async () => {
      res.redirect(200, `${process.env.BASE_URL}/account/balance/${id}`);
    })
    .catch(() => {
      res.status(404).json("Account not found");
    });
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};

export const validators = [
  check("value", "Value field is required").exists(),
  check("value", "Value should be greater than 0").isFloat({ gt: 0 }),
];
