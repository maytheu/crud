import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { unauthenticatedError } from "./globalError";
import { env } from "../config/validate";

export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer"))
      return next(unauthenticatedError());

    const token = header.split(" ")[1];
    if (!token) return next(unauthenticatedError());

    const decode: any = await jwt.verify(token, env.JWT_SECRET);
    if (!decode) return next(unauthenticatedError());

    req.user = decode.user;
    next();
  } catch (error) {
    next(error);
  }
};
