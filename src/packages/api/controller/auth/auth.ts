import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import * as httpStatus from "http-status";
import { datasource } from "~/ormconfig";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(httpStatus.OK).json(validation);
  }

  return res.status(httpStatus.OK).json({ ok: "ok" });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(httpStatus.OK).json(validation);
  }

  var fileName = "";
  if (!Array.isArray(req.files.upload_image)) {
    fileName = "src/upload/" + randomUUID() + "." + req.files.upload_image.name.split(".").pop();
    req.files.upload_image.mv(fileName, (err) => {
      console.log(err);
    });
  }

  return res.status(httpStatus.OK).json({ ok: "ok" });
};
