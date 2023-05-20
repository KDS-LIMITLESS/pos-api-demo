import * as e from 'express';
import { IUser } from '../models/users';


export declare type UserSessionResponse = Omit<IUser, 'password'>


export interface IReq<T = any, U = any> extends e.Request  {
    body: T
    user?: U
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

export type UserLogin = Pick<IUser, 'password' | 'email' | 'username'>

export type UserSession = Pick<IUser, 'username' | 'role'>

