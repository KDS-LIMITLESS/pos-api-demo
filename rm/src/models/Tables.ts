import { pool as db } from './connection';



class CreateTable {

  async createUserTable(): Promise<void> {
    await db.query(`CREATE TABLE IF NOT EXISTS users (
      email VARCHAR PRIMARY KEY NOT NULL,
      username VARCHAR NOT NULL UNIQUE,
      pwdhash VARCHAR NOT NULL,
      role VARCHAR NOT NULL,
      phone_number VARCHAR,
      full_name VARCHAR NOT NULL,
      status VARCHAR DEFAULT 'PENDING',
      works_at VARCHAR NOT NULL REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
      user_otp VARCHAR,
      created_at TIMESTAMP DEFAULT now()
    )`);
    console.log('Created users table');
  }

  async createRestaurantTable(): Promise<void> {
    await db.query(`CREATE TABLE IF NOT EXISTS restaurants (
      business_name VARCHAR NOT NULL UNIQUE,
      restaurant_id VARCHAR(6) PRIMARY KEY,
      business_address VARCHAR NOT NULL,
      parent_restaurant_id VARCHAR,
      mode VARCHAR NOT NULL
    )`);
    console.log('Created restaurant table');
  }

  // async multiStoredRestaurant(): Promise<void> {
  //   return db.query(`CREATE TABLE IF NOT EXISTS ids (
  //     restaurant_id VARCHAR(6) PRIMARY KEY,
  //     parent_restaurant_id VARCHAR,
  //     branch_admin VARCHAR REFERENCES users(username),
  //     mode VARCHAR NOT NULL
  //   )`).then(function(){
  //       setTimeout(() => {
  //         console.log('Created restaurant table')
  //       }, 2000)
  //   })
  // }

  public async dropUsersTable(): Promise<void> {
    return db.query('DROP TABLE users CASCADE;')
      .then(function() {
        console.log('Dropped users Table');
      });
  }

  public async dropRestaurantTable(): Promise<void> {
    return db.query('DROP TABLE restaurants CASCADE;')
      .then(function() {
        console.log('Dropped restaurants Table');
      });
  }
}
export const tables = new CreateTable();


  

