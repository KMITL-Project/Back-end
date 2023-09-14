import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status";
import { datasource } from "~/ormconfig";

export const list = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // const users = await getConnection().getRepository(User).createQueryBuilder("user").getMany();
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send(error);
  }
};
