import Router from "express-promise-router";
import { login, register } from "./auth";
import { loginValidation, registerValidation } from "../../validation/authValidation";
import { verifyToken } from "../../middlewares/common";

const authRouter = Router();

authRouter.post("/register", registerValidation, register);
authRouter.post("/login", loginValidation, login);

export default authRouter;
