import { Router } from "express";
import * as accountController from "../controllers/accountController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.get("/:id/balance", [checkJwt], accountController.balance);

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
