import { QueryResult } from 'pg';
import { pool as db } from './connection';
import SQL from 'sql-template-strings';

export enum UserRoles {
  Admin,
  Manager,
  Standard,
}

export interface IUser {
  full_name: string,
  email: string,
  password: string,
  role: UserRoles,
  phone_number: string
} 


interface IQueryResult<R extends any[] = IUser[] > extends  QueryResult {
  rows: R
}

export class UserModel{
  /**
  * 
  * @param user full_name,email,password,role,phone_number
  * @returns user
  */
  async newUser(user: IUser) {
    const newUser = await db.query(SQL `INSERT INTO 
      users(
        full_name, 
        email, 
        password, 
        role, 
        phone_number
      ) 
      VALUES (
        ${user.full_name},
        ${user.email}, 
        ${user.password}, 
        ${user.role}, 
        ${user.phone_number}
      )`
    );
    console.log(newUser.rows);
    return newUser.rows;
  }

  /**
    * Check if given email exists in database
    * @param email string
    * @returns boolean
    */
  async isUserExist(email: IUser['email']): Promise<boolean> {
    return (await db.query(`SELECT * FROM users 
      WHERE email = $1`, [email])).rowCount === 1;
  }
}