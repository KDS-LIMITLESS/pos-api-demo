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
  password: string,
  role?: UserRoles,
} 


export class UserModel{

  /**
  * 
  * @param user full_name,email,password,role
  * @returns user
  */
  async newUser(user: IUser): Promise<IUser>{
    let pwdHash = await bcrypt.hash(user.password, 12)
    const { rows } = await db.query(SQL `INSERT INTO 
      users(
        username, 
        email, 
        pwdhash, 
        role
      ) 
      VALUES (
        ${user.username},
        ${user.email}, 
        ${pwdHash}, 
        ${UserRoles[0]}
      )`
    );
    console.log(rows)
    return rows[0] || null
  }

  async compareUserPwd(pwd: string, email?: string): Promise<IUser> {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email])
    const checkPSW = await bcrypt.compare(pwd, rows[0]['pwdhash'])
    console.log(checkPSW)
    return checkPSW === true ? rows[0] : null
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