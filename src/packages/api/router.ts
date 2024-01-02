import * as express from "express";
import authRouter from "./controller/auth/authRouter";
import userRouter from "./controller/user/userRouter";
import lotRouter from "./controller/lot/lotRouter";
import shelfRouter from "./controller/shelf/shelfRouter";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/lot", lotRouter);
router.use("/shelf", shelfRouter);

export default router;
