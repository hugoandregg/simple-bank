import { Router } from "express";
import * as accountController from "../controllers/accountController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.get("/balance", [checkJwt], accountController.balance);

router.put(
  "/deposit",
  accountController.validators,
  accountController.validate,
  accountController.deposit
);

router.put(
  "/withdraw",
  accountController.validators,
  accountController.validate,
  accountController.withdraw
);

export default router;
