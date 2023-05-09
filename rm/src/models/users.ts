import { pool as db } from './connection';
import SQL from 'sql-template-strings';
import bcrypt from 'bcrypt'
import { IRestaurant } from './restaurants';

export enum UserRoles {
  Owner,
  Manager,
  Admin,
  Waiter
}

export interface IUser {
  username: string,
  full_name: string,
  phone_number: string,
  email: string,
  password: string,
  role?: UserRoles,
  works_for: IRestaurant['business_name'],
  status: string
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
        full_name,
        phone_number,
        email, 
        pwdhash, 
        role
      ) 
      VALUES (
        ${user.username},
        ${user.full_name},
        ${user.phone_number}
        ${user.email}, 
        ${pwdHash}, 
        ${UserRoles[0]}
      )`
    );
    console.log(rows)
    return rows[0] || null
  }

  /**
   * DB function to check usersl plain password against the hash in db
   * @param pwd plain password to compare
   * @param email users email 
   * @returns user if pwd matches password in db
   */
  async compareUserPwd(pwd: string, email?: string): Promise<IUser> {
    const { rows } = await db.query(
      'SELECT * FROM users WHERE email = $1', [email]
    )
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

  /**
   * Rad a user row from the database
   * @param user user to return profie of
   * @returns user
   */
  async getUserProfile(user:IUser): Promise<IUser> {
    const { rows } = await db.query(SQL `SELECT * FROM users WHERE username = ${user.username}`)
    return rows[0] || null
  }

  /**
   * Update a user row in the database
   * @param user user to update profile
   * @returns user
   */
  async updateUserProfile(user:IUser): Promise<IUser> {
    const row = await db.query(SQL `UPDATE users SET 
      username = ${user.username},
      fullname = ${user.full_name},
      phone_number = ${user.phone_number}

      WHERE email = $1`, [user.email]
    )
    return row.rows[0] && row.rowCount
  }

  /**
   * Deletes a user row from the database
   * @param user user to delete from database
   * @returns user
   */
  async deleteUser(user: IUser['username']): Promise<IUser> {
    const {rows} = await db.query(`DELETE FROM users WHERE user = $1`, [user])
    return rows[0]
  }

  /**
   * Sets a users status to suspended
   * @param user user account to suspend
   * @returns user
   */
  async suspendUser(user:IUser): Promise<IUser> {
    const { rows } = await db.query(`UPDATE users SET status = $1 
    WHERE username = $2`,['SUSPENDED', user['username']])
    return rows[0]
  }

  /**
   * Update a user password to the newPassword in the db.
   * @param user user to change their password
   * @param newPassword new password for user
   * @returns boolean
   */
  async changePassword(user:IUser, newPassword:string): Promise<boolean>{
    let pwdHash = await bcrypt.hash(newPassword, 12)
    const row  = await db.query(`UPDATE users SET password = $1
      WHERE user = $2`, [pwdHash, user['username']]
    )
    return row.rowCount === 1
  }
}