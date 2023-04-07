import * as e from 'express';
import { Query } from 'express-serve-static-core';


export interface IReq<T = void> extends e.Request {
    body: T
}

export interface IReqQuery<Q extends Query > extends e.Request {
    query: Q
}

/**
 * Response object type
 */
export interface IResponseObject {
    message: string | '',
    data?: object
}