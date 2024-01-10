import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status";
import { floorService } from "../../services/floorService";
import { randomUUID } from "crypto";

export const getAllFloor = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await floorService.getFloorAll();
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "get all floors success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getFloor = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await floorService.getFloorById(Number(req.params.id));
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "get floors success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const createFloor = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  var fileName = "";
  if (!Array.isArray(req.files.image_url)) {
    fileName = "src/upload/" + randomUUID() + "." + req.files.image_url.name.split(".").pop();
    req.files.image_url.mv(fileName, (err) => {
      if (err) console.log("error:", err);
    });
    req.body.image_url = fileName;
  }

  try {
    const rsp = await floorService.createFloor({ ...req.body });
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "create floors success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateFloor = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await floorService.updateFloor(Number(req.params.id), { ...req.body });
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "update floors success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteFloor = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await floorService.deleteFloor(Number(req.params.id));
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "delete floors success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
