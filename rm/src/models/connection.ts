import { Pool } from 'pg';
import * as dotenv from 'dotenv';
// import { tables } from './Tables';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_CONNECTION,
  max: 20,
  ssl: true,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

// tables.createRestaurantTable()
// tables.createUserTable()
pool.on('connect', function(client) {
  client.emit(`Connected to database.... ${pool.totalCount} `);
});

pool.on('error', function(err, client) {
  client.emit(`${err.message}`);
});

pool.on('remove', function(client){
  client.emit(`A client was removed ${pool.totalCount}`);
});

export default {
  pool
} as const;
