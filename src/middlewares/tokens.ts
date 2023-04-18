import jwt, { decode, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express-serve-static-core";
import * as dotenv from 'dotenv'
import { IUser, UserRoles } from "../models/users";
import HttpStatusCodes from "../app-constants/HttpStatusCodes";
import { LogError } from "../utils/errors";
import AppConstants from "../app-constants/custom";
import { IReq } from "../Types/express";

dotenv.config()

async function generateToken(user:string, role:UserRoles): Promise<string> {
  const token = jwt.sign({user, role}, process.env.JWT_SECRET as string, {
    expiresIn: "10h",
    algorithm: "HS512"
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

function authenticateUserToken(req:IReq, res:Response, next:NextFunction) {
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