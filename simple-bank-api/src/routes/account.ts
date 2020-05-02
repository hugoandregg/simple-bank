import express from "express";
import * as accountController from "../controllers/accountController";

const router = express.Router();

router.get("/:id/balance", accountController.balance);

router.put(
  "/:id/deposit",
  accountController.validators,
  accountController.validate,
  accountController.deposit
);

router.put(
  "/:id/withdraw",
  accountController.validators,
  accountController.validate,
  accountController.withdraw
);

export default router;
