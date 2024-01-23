import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status";
import { lotService } from "../../services/lotService";

export const createLot = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await lotService.createLot({ ...req.body }, Number(req.body.material_id));
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
