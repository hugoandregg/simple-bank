import { Router } from "express";
import * as authController from "../controllers/authController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.post("/login", authController.login);

router.post("/change-password", [checkJwt], authController.changePassword);

export default router;
