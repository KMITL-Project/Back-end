import * as express from "express";
import authRouter from "./controller/auth/authRouter";
import userRouter from "./controller/user";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
