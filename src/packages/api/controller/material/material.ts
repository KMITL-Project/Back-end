import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status";
import { materialsService } from "../../services/materialsService";

export const getAllMaterial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await materialsService.getMaterialAll();
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "get all material success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getMaterial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await materialsService.getMaterialById(Number(req.params.id));
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "get material success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const createMaterial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await materialsService.createMaterial({ ...req.body });
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "create material success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateMaterial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await materialsService.updateMaterial(Number(req.params.id), { ...req.body });
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "update material success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteMaterial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await materialsService.deleteMaterial(Number(req.params.id));
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "delete material success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
