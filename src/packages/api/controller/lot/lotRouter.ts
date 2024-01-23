import Router from "express-promise-router";
import { validateToken } from "../../util/jwt";
import { createLot, withdrawLot } from "./lot";

const lotRouter = Router();
lotRouter.post("/create", validateToken, createLot);
lotRouter.post("/withdraw", validateToken, withdrawLot);

export default lotRouter;
