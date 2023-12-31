import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import * as httpStatus from "http-status";
import { datasource } from "~/ormconfig";
import { User } from "~/packages/database/models/models";
import { userService } from "../../services/userService";
import { number } from "@hapi/joi";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(httpStatus.OK).json(validation);
  }

  try {
    const rsp = userService.login(req.body.username, req.body.password);
    console.log(rsp);
  } catch (error) {
    console.error(error);
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
      if (err) console.log("error:", err);
    });
    req.body.image_url = fileName;
  }

  try {
    const rsp = await userService.createUser({ ...req.body });
    return res.status(httpStatus.OK).json({
      code: 200,
      message: "success",
      data: {
        user_id: rsp.id,
      },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ code: Number(error.code), message: error.message });
  }
};
