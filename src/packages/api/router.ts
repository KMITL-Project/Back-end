import * as express from "express";
import authRouter from "./controller/auth/authRouter";
import userRouter from "./controller/user/userRouter";
import lotRouter from "./controller/lot/lotRouter";
import shelfRouter from "./controller/shelf/shelfRouter";
import floorRouter from "./controller/floor/floorRouter";
import unitRouter from "./controller/unit/unitRouter";
import materialRouter from "./controller/material/materialRouter";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/lot", lotRouter);
router.use("/shelf", shelfRouter);
router.use("/floor", floorRouter);
router.use("/unit", unitRouter);
router.use("/material", materialRouter);

export default router;
