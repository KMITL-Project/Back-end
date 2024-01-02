import Router from "express-promise-router";
import { validateToken } from "../../util/jwt";
import { createLot } from "./lot";

const lotRouter = Router();
lotRouter.post("/create", validateToken, createLot);

export default lotRouter;
