import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as httpStatus from 'http-status';
import { userService } from '../../services/userService';

export const login = async (req: Request, res: Response, _: NextFunction) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(httpStatus.OK).json(validation);
  }

  try {
    const token = await userService.login(req.body.username, req.body.password);
    if (token) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Login success',
        data: { token: token },
      });
    }
    return res.status(httpStatus.OK).json({
      code: httpStatus.UNAUTHORIZED,
      message: 'Login fail',
      data: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ code: Number(error.code), message: error.message });
  }
};

export const register = async (req: Request, res: Response, _: NextFunction) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(httpStatus.OK).json(validation);
  }

  let fileName = '';
  if (!Array.isArray(req.files.upload_image)) {
    fileName = randomUUID() + '.' + req.files.upload_image.name.split('.').pop();
    req.files.upload_image.mv('src/upload/' + fileName, (err) => {
      if (err) console.log('error:', err);
    });
    req.body.image_url = fileName;
  }

  try {
    const rsp = await userService.createUser({ ...req.body });
    return res.status(httpStatus.OK).json({
      code: 200,
      message: 'success',
      data: {
        user_id: rsp.id,
      },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ code: Number(error.code), message: error.message });
  }
};
