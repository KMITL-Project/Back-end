import express from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // TODO bypass verify token
  next();

  const token = req.headers.authorization?.split(" ")[1]; // Bearer Token

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "YourSecretKey"); // Replace 'YourSecretKey' with your actual secret key
    req.user = decoded; // Assuming the decoded token contains the user information including roles
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
};

enum Role {
  Admin = "admin",
  Editor = "editor",
  User = "user",
}

const checkRole = (roles: Role[]) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.user && roles.includes("admin" as Role)) {
      next();
    } else {
      res.status(403).json({ message: "Access Denied" });
    }
  };
};
