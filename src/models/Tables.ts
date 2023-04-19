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

  static async createRestaurantTable(): Promise<void> {
    return db.query(`CREATE TABLE restaurants (
      business_name VARCHAR PRIMARY KEY,
      phone_number VARCHAR(20),
      restaurant_id VARCHAR(6),
      verification_status VARCHAR(10),
      admin VARCHAR,
      FOREIGN KEY (admin) REFERENCES users(email)
    );`)
    .then(function() {
      console.log('Created restaurants Table');
    });
  }

  static async dropRestaurantTable(): Promise<void> {
    return db.query(`DROP TABLE restaurant;`)
      .then(function() {
        console.log('Created restaurants Table');
      });
  }
}
export const tables = new CreateTable()


  

