import { pool as db } from './connection';
import SQL from 'sql-template-strings';
import bcrypt from 'bcrypt';

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
  role:  string,// 'Owner'|'Manager'|'Admin'|'Waiter',
  works_at: string,
  status: 'SUSPENDED' | 'ACTIVE' | 'PENDING',
  user_otp? : string,
  created_at: Date
} 


export class UserModel{

  /**
  * 
  * @param user full_name,email,password,role
  * @returns user
  */
  async newUser(user: IUser): Promise<IUser>{
    const pwdHash = await bcrypt.hash(user.password, 12);
    const { rows } = await db.query(SQL `INSERT INTO 
      users(
        username, 
        full_name,
        phone_number,
        email, 
        pwdhash, 
        role,
        works_at
      ) 
      VALUES (
        ${user.username},
        ${user.full_name},
        ${user.phone_number},
        ${user.email}, 
        ${pwdHash}, 
        ${UserRoles[0]},
        ${user.works_at}
      )`
    );
    return rows[0] || null;
  }

  /**
   * DB function to check users plain password against the hash in db
   * @param pwd plain password to compare
   * @param email users email 
   * @returns user if pwd matches password in db
   */
  async compareUserPwd(pwd: string, user:IUser): Promise<IUser> {
    const { rows } = await db.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [user.email, user.username]
    );
    return rows[0] ? 
      await bcrypt.compare(pwd, rows[0]['pwdhash']) ? rows[0] : null
    : null
     // return checkPSW === true ? rows[0] : null;
  }

  /**
    * Check if given email exists in database
    * @param username string
    * @returns boolean
    */
  async isUserExist(user: IUser): Promise<boolean> {
    return (await db.query(`SELECT username, email FROM users 
      WHERE username = $1 OR email = $2`, [user.username, user.email])).rowCount === 1;
  }

  /**
   * Rad a user row from the database
   * @param user user to return profie of
   * @returns user
   */
  async getUserProfile(user:IUser): Promise<IUser> {
    const { rows } = await db.query(SQL `SELECT username, email,
    role, works_at, fullname, phone_number FROM users WHERE username = $1`, 
    [user.username]);
    return rows[0] || null;
  }

  /**
   * Update a user row in the database
   * @param user user to update profile
   * @returns user
   */
  async updateUserProfile(user:IUser): Promise<IUser> {
    const row = await db.query(SQL `UPDATE users SET 
      username = ${user.username},
      full_name = ${user.full_name},
      phone_number = ${user.phone_number}

      WHERE username = $1`, [user.username]
    );
    return row.rows[0] && row.rowCount;
  }

  /**
   * Deletes a user row from the database
   * @param user user to delete from database
   * @returns user
   */
  async deleteUser(user: IUser): Promise<IUser> {
    const {rows} = await db.query('DELETE FROM users WHERE username = $1', [user.username]);
    return rows[0];
  }

  /**
   * Sets a users status to suspended
   * @param user user account to suspend
   * @returns user
   */
  async updateUserStatus(status: IUser['status'], user:IUser): Promise<IUser> {
    const { rows } = await db.query(`UPDATE users SET status = $1 
    WHERE username = $2`,[status, user.username]);
    return rows[0];
  }

  async userStatus(user: IUser): Promise<IUser['status']> {
    return (await db.query(`SELECT status FROM users WHERE username = $1`, 
    [user.username])).rows[0]
  }

  /**
   * Update a user password to the newPassword in the db.
   * @param user user to change their password
   * @param newPassword new password for user
   * @returns boolean
   */
  async changePassword(user:IUser, newPassword:string): Promise<boolean>{
    const pwdHash = await bcrypt.hash(newPassword, 12);
    const row  = await db.query(`UPDATE users SET password = $1
      WHERE user = $2`, [pwdHash, user['username']]
    );
    return row.rowCount === 1;
  }

  async setuserOTP(otp: string, user:IUser) {
    await db.query('UPDATE users SET user_otp = $1 WHERE email = $2', 
      [otp, user.email]);
  }

  async getUserOTP(user: IUser): Promise<string>{
    const otp = await db.query('SELECT user_otp FROM users WHERE email = $1',
      [user.email]);
    return otp.rows[0]['user_otp'];
  }

}