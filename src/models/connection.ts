import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { CreateTable } from './Tables';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_CONNECTION,
  max: 20,
  ssl: true,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

pool.on('connect', function(client) {
  console.log('Connected to database', pool.totalCount);
});

pool.on('error', function(err, client) {
  console.log(err.message);
});

pool.on('remove', function(){
  console.log('A client was removed', pool.totalCount);
});

export default {
  pool
} as const;
