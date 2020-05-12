import { Router } from "express";
import * as userController from "../controllers/userController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], userController.listAll);

// Get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  userController.getOneById
);

//Create a new user
router.post("/", userController.newUser);

//Edit one user
router.patch("/edit", [checkJwt], userController.editUser);

//My profile
router.get("/myProfile", [checkJwt], userController.myProfile);

//Delete one user
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  userController.deleteUser
);

export default router;
