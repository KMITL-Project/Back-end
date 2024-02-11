import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status';
import { roleService } from '../../services/roleService';
import validateError from '../../errors/validateError';

export const getAllRole = async (req: Request, res: Response, _: NextFunction): Promise<any> => {
  try {
    const rsp = await roleService.getRoleAll();
    return res.status(httpStatus.OK).json({
      code: 200,
      message: 'get all role success',
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

export const getRole = async (req: Request, res: Response, _: NextFunction): Promise<any> => {
  try {
    const rsp = await roleService.getRoleById(Number(req.params.id));
    return res.status(httpStatus.OK).json({
      code: 200,
      message: 'get role success',
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

export const createRole = async (req: Request, res: Response, _: NextFunction): Promise<any> => {
  try {
    const rsp = await roleService.createRole({ ...req.body });
    return res.status(httpStatus.OK).json({
      code: 200,
      message: 'create role success',
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

export const updateRole = async (req: Request, res: Response, _: NextFunction): Promise<any> => {
  try {
    const rsp = await roleService.updateRole(Number(req.params.id), { ...req.body });
    return res.status(httpStatus.OK).json({
      code: 200,
      message: 'update role success',
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

export const deleteRole = async (req: Request, res: Response, _: NextFunction): Promise<any> => {
  try {
    const rsp = await roleService.deleteRole(Number(req.params.id));
    return res.status(httpStatus.OK).json({
      code: 200,
      message: 'delete role success',
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
