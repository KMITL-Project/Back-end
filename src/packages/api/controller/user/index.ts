import Router from "express-promise-router";
import { list } from "./user";

const userRouter = Router();
userRouter.get("/list", list);

export default userRouter;
