import jwt from "jsonwebtoken";
import config from "~/config";
import { User } from "~/packages/database/models/models";

export const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  return jwt.sign(payload, config.AUTH.TOKEN_SECRET, { expiresIn: "1h" }); // Expires in 1 hour
};

export const validationToken = (token: string) => {
  console.log(jwt.verify(token, config.AUTH.TOKEN_SECRET));
};
