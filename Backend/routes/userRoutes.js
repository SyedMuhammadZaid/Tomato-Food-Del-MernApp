import { loginUser, registerUser } from "../controllers/userController.js";
import express from "express";

let userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
