import knex from "knex"
import { config } from './knexfile'

export enum UserRoles {
    Admin,
    Manager,
    Standard,
}


export interface IUser {
    full_name: string,
    email: string,
    pwdHash: string,
    role: UserRoles,
    phone_number: string
}

const db = knex(config.development)

export class UserModel{
    /**
     * 
     * @param user full_name,email,pwdHash,role,phone_number
     * @returns user
     */
    async newUser(user: IUser): Promise<IUser> {
        return db('users').insert<IUser>(user)
    }

    /**
     * Check if given email exists in database
     * @param email string
     * @returns IUser
     */
    async isUser(email:string): Promise<IUser> {
        return db('users').select<IUser>('email')
        .where({email})
    }
}