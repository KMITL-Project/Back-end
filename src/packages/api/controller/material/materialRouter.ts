import Router from "express-promise-router";
import { validateToken } from "../../util/jwt";
import { createMaterial } from "./material";

const userRouter = Router();
userRouter.post("/create", validateToken, createMaterial);

export default userRouter;
