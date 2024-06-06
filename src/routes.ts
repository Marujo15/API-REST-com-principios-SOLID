import express from "express";
import { authenticate } from "./middlewares/autenticate";
import { createUserController } from "./useCases/User/CreateUser";
import { loginUserController } from "./useCases/User/LoginUser";
import { logoutUserController } from "./useCases/User/LogoutUser";
import { updateUserController } from "./useCases/User/UpdateUser";
import { deleteUserController } from "./useCases/User/DeleteUser";
import { listUsersController } from "./useCases/User/ListUsers";

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
