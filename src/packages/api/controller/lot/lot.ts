import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status";
import { lotService } from "../../services/lotService";

export const createLot = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await lotService.addLot(Number(req.body.material_id), {
      name: req.body.name as string,
      buy_date: req.body.buy_date,
      price: req.body.price,
      amount: req.body.amount,
      detail: req.body.detail,
    },req.user.id);
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "create lot success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const withdrawLot =async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await lotService.withdrawLot(Number(req.body.material_id),Number(req.body.amount),req.user.id);
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "create lot success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}
