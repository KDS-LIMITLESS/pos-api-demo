import jwt  from "jsonwebtoken";
import * as e from 'express'
import * as dotenv from 'dotenv'
import { IUser } from "../models/users";
import HttpStatusCodes from "../app-constants/HttpStatusCodes";
import { LogError } from "../utils/errors";
import AppConstants from "../app-constants/custom";

dotenv.config()

interface IReqUser<U = any> extends e.Request {
  user: U
}


async function generateToken(user:string, role:IUser['role']): Promise<string> {
  const token = jwt.sign({user, role}, process.env.JWT_SECRET as string, {
    expiresIn: "10h"
  })
  return token
}

function verifyToken(token:string): string | jwt.JwtPayload | undefined {
  let userToken: string | jwt.JwtPayload| undefined;
  jwt.verify(token, process.env.JWT_SECRET as string, 
    function (error, decoded) {

      if (error) throw new LogError(HttpStatusCodes.BAD_REQUEST, error.message)
      userToken = decoded;

    });
  return userToken;
}

function authenticateUserToken(req:IReqUser, res:e.Response, next:e.NextFunction) {
  const token = req.headers.authorization?.split('')
  if (token === undefined || token![0] !== 'Bearer' ||
    token![1] === undefined) {

    throw new LogError(
      HttpStatusCodes.UNAUTHORIZED, 
      AppConstants.BAD_AUTH_HEADERS
    )
  }
  const user = verifyToken(token[1])
  req.user = user
  next()
}


export default{
  generateToken,
  verifyToken,
  authenticateUserToken
} as const