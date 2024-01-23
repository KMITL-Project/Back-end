import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status';
import { userService } from '../../services/userService';

export const userList = async (req: Request, res: Response, _: NextFunction): Promise<any> => {
  try {
    // const users = await getConnection().getRepository(User).createQueryBuilder("user").getMany();
    return res.status(httpStatus.OK).json({
      code: 200,
      message: '',
      data: {},
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const userInfo = async (req: Request, res: Response, _: NextFunction): Promise<any> => {
  try {
    if (!req.user)
      return res.status(httpStatus.OK).json({
        code: 400,
        message: 'something wrong',
        data: {},
      });
    const rsp = await userService.getUserById(req.user.id);
    return res.status(httpStatus.OK).json({
      code: 200,
      message: '',
      data: rsp,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
