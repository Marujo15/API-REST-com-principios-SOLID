import express from "express";
import { authenticate } from "./middlewares/autenticate";
import { createUserController } from "./useCases/CreateUser";
import { loginUserController } from "./useCases/LoginUser";
import { logoutUserController } from "./useCases/LogoutUser";
import { updateUserController } from "./useCases/UpdateUser";
import { deleteUserController } from "./useCases/DeleteUser";
import { listUsersController } from "./useCases/ListUsers";

const router = express.Router();

router.post("/users", (req, res) => {
  return createUserController.handle(req, res);
});

router.post("/login", (req, res) => {
  return loginUserController.handle(req, res);
});

router.delete("/logout", (req, res) => {
  return logoutUserController.handle(req, res);
});
/* IN WORKING PROGRESS */
router.patch("/users/:id", authenticate, (req, res) => {
  return updateUserController.handle(req,res);
}); //

router.delete("/users/:id", authenticate,(req, res) => {
  return deleteUserController.handle(req, res);
});

router.get("/users/", authenticate,(req, res) => {
  return listUsersController.handle(req, res)
});
/* ------------------ */

export { router };
