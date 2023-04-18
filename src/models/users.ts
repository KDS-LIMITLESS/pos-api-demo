import { QueryResult } from 'pg';
import { pool as db } from './connection';
import SQL from 'sql-template-strings';
import bcrypt from 'bcrypt'

export enum UserRoles {
  Admin,
  Manager,
  Standard,
}

export interface IUser {
  username: string,
  email: string,
  pwdHash: string,
  role: UserRoles,
  
} 


export class UserModel{

  /**
  * 
  * @param user full_name,email,password,role
  * @returns user
  */
  async newUser(user: IUser): Promise<IUser>{
    let pwdHash = await bcrypt.hash(user.pwdHash, 12)
    const { rows } = await db.query(SQL `INSERT INTO 
      users(
        username 
        email, 
        pwdHash, 
        role, 
      ) 
      VALUES (
        ${user.username},
        ${user.email}, 
        ${pwdHash}, 
        ${UserRoles.Admin}, 
      )`
    );
    return rows[0] || null
  }

  async compareUserPwd(pwd: string, email?: string): Promise<boolean> {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email])
    return await bcrypt.compare(pwd, rows[0]['pwdHash'])
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