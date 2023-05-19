import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

const app = express();

app.use(express.json());
app.use(cors()); // add more security checks to cors 
dotenv.config();

app.use('/api', require('./routes'));

// Add error handler 

// register routes
const PORT = process.env.PORT || 3000;  // use node_env

app.listen(PORT, async function start() {
  console.log(`Server Listening for connections on port ${PORT}`);
  // Promise.all([
  //   tables.createUserTable(),
  //   tables.createRestaurantTable()
  // ])
});