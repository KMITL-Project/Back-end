import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status";
import { shelfService } from "../../services/shelfService";
import { randomUUID } from "crypto";

export const getAllShelf = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await shelfService.getShelfAll();
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "get all shelf success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getShelf = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await shelfService.getShelfById(Number(req.params.id));
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "get shelf success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const createShelf = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  var fileName = "";
  if (!Array.isArray(req.files.image_url)) {
    fileName = randomUUID() + "." + req.files.image_url.name.split(".").pop();
    req.files.image_url.mv("src/upload/" + fileName, (err) => {
      if (err) console.log("error:", err);
    });
    req.body.image_url = fileName;
  }

  try {
    const rsp = await shelfService.createShelf({ ...req.body });
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "create shelf success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateShelf = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await shelfService.updateShelf(Number(req.params.id), { ...req.body });
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "update shelf success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteShelf = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const rsp = await shelfService.deleteShelf(Number(req.params.id));
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "delete shelf success",
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
