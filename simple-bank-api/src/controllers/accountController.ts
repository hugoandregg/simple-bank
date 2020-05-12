import { getCustomRepository } from "typeorm";
import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { AccountRepository } from "../repository/AccountRepository";
import { checkJwt } from "../middlewares/checkJwt";

export const balance = async (req: Request, res: Response) => {
  const id = res.locals.jwtPayload.userId;
  await getCustomRepository(AccountRepository)
    .findOneOrFail({ where: { user: id } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(404).json("Account not found");
    });
};

export const deposit = async (req: Request, res: Response) => {
  const id = res.locals.jwtPayload.userId;
  const value = req.body.value;
  const accountRepository = getCustomRepository(AccountRepository);

  await accountRepository
    .findOneOrFail(id)
    .then((result) => {
      accountRepository
        .deposit(result, value)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};

export const withdraw = async (req: Request, res: Response) => {
  const id = res.locals.jwtPayload.userId;
  const value = req.body.value;
  const accountRepository = getCustomRepository(AccountRepository);

  await accountRepository
    .findOneOrFail(id)
    .then((result) => {
      accountRepository
        .withdraw(result, value)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    })
    .catch((error) => {
      res.status(404).json(error);
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
  checkJwt,
  check("value", "Value field is required").exists(),
  check("value", "Value should be greater than 0").isFloat({ gt: 0 }),
];
