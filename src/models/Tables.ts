import { pool as db } from './connection';



export class CreateTable {

  async createUserTable(): Promise<void> {
    return db.query(`CREATE TABLE IF NOT EXISTS users (
        email VARCHAR PRIMARY KEY NOT NULL,
        full_name VARCHAR NOT NULL,
        pwdHash VARCHAR NOT NULL,
        role VARCHAR NOT NULL,
        phone_number VARCHAR NOT NULL
    )`)
      .then(function() {
        console.log('Created Users Table');
      });
  }
}