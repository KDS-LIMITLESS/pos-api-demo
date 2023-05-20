import express from 'express';
import cors from 'cors';
import dotenv from'dotenv'

const app = express();
dotenv.config()

app.use(express.json());
app.use(cors()); // add more security checks to cors

app.use('/api', require('./routes/index'));



const PORT = process.env.PORT || 4000;  // use node_env

app.listen(PORT, function start() {
  console.log(`POS Server Listening for connections on port ${PORT}`);
});