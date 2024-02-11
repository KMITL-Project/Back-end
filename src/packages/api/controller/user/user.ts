import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status';
import { userService } from '../../services/userService';
import validateError from '../../errors/validateError';

export const userList = async (req: Request, res: Response, _: NextFunction): Promise<any> => {
  try {
    // const users = await getConnection().getRepository(User).createQueryBuilder("user").getMany();
    return res.status(httpStatus.OK).json({
      code: 200,
      message: '',
      data: {},
    });
  } catch (error) {
    const { code, message } = validateError(error);
    return res.status(code).json({
      code,
      message,
    });
  }
};

export const userInfo = async (req: Request, res: Response, _: NextFunction): Promise<any> => {
  try {
    const rsp = await userService.getUserById(req.user.id);
    return res.status(httpStatus.OK).json({
      code: 200,
      message: '',
      data: rsp,
    });
  } catch (error) {
    const { code, message } = validateError(error);
    return res.status(code).json({
      code,
      message,
    });
  }
};
