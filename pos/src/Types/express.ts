import * as e from 'express';

export interface IReq<T = any> extends e.Request {
    body: T   
}


/**
 * User response session
 */
export interface ISessionUser {
    full_name: string,
    email: string,
    role: string
}

/**
 * Response object type
 */
export interface IRes extends e.Response {
    locals: {
        sessionUser?: ISessionUser
    }
}

