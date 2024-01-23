import * as express from "express";
import authRouter from "./controller/auth/authRouter";
import userRouter from "./controller/user/userRouter";
import lotRouter from "./controller/lot/lotRouter";
import shelfRouter from "./controller/shelf/shelfRouter";
import floorRouter from "./controller/floor/floorRouter";
import unitRouter from "./controller/unit/unitRouter";
import materialRouter from "./controller/material/materialRouter";
import materialHistoryRouter from "./controller/materialHistory/materialHistoryRouter";
const path = require("path");

const router = express.Router();

const uploadDirectory = path.join(__dirname, "../../upload");

router.use("/upload", express.static(uploadDirectory));
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/lot", lotRouter);
router.use("/shelf", shelfRouter);
router.use("/floor", floorRouter);
router.use("/unit", unitRouter);
router.use("/material", materialRouter);
router.use("/material-history", materialHistoryRouter);

export default router;
