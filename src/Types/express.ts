import * as e from 'express';
import { Query } from 'express-serve-static-core';
import { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/users';


export declare type UserSessionResponse = Omit<IUser, 'password'>

export interface IReq<T = any, U = any > extends e.Request {
    body: T
    user: U
}

export interface IReqQuery<Q extends Query > extends e.Request {
    query: Q
}

/**
 * User response session
 */
export interface ISessionUser {
    full_name: string,
    email: string,
    role: IUser['role']
}

/**
 * Response object type
 */
export interface IRes extends e.Response {
    locals: {
        sessionUser?: ISessionUser
    }
}

export type UserLogin = Pick<IUser, 'pwdHash' | 'email'>

export type UserSession = Pick<IUser, 'username' | 'role'>

