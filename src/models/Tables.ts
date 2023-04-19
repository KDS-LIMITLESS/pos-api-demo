import { pool as db } from './connection';



class CreateTable {

  async createUserTable(): Promise<void> {
    return db.query(`CREATE TABLE IF NOT EXISTS users (
        email VARCHAR PRIMARY KEY NOT NULL,
        username VARCHAR NOT NULL UNIQUE,
        pwdhash VARCHAR NOT NULL,
        role VARCHAR NOT NULL
    )`)
      .then(function() {
        console.log('Created Users Table');
      });
  }
}
export const tables = new CreateTable()
