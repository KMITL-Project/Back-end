import Router from "express-promise-router";
import { validateToken } from "../../util/jwt";
import { createFloor, deleteFloor, getAllFloor, getFloor, updateFloor } from "./floor";

const floorRouter = Router();
floorRouter.get("/", validateToken, getAllFloor);
floorRouter.get("/:id", validateToken, getFloor);
floorRouter.post("/", validateToken, createFloor);
floorRouter.put("/:id", validateToken, updateFloor);
floorRouter.delete("/:id", validateToken, deleteFloor);

export default floorRouter;
