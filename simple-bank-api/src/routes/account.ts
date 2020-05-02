import express from "express";
import * as accountController from "../controllers/accountController";

const router = express.Router();

router.get("/balance/:id", accountController.balance);

router.put(
  "/deposit/:id",
  accountController.validators,
  accountController.validate,
  accountController.deposit
);

router.put(
  "/withdraw/:id",
  accountController.validators,
  accountController.validate,
  accountController.withdraw
);

export default router;
