import express from 'express';
import 'express-async-errors'
import cors from 'cors';
import * as dotenv from 'dotenv';

const app = express();

app.use(express.json());
app.use(cors()); // add more security checks to cors 
dotenv.config();

app.use('/api', require('./routes'));


// register routes
const PORT = process.env.PORT || 3000; 

app.listen(PORT, async function start() {
  console.log(`Server Listening for connections on port ${PORT}`);
});