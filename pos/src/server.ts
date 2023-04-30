import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors()); // add more security checks to cors 


const PORT = process.env.POS_PORT || 4000;  // use node_env

app.listen(PORT, function start() {
  console.log(`POS Server Listening for connections on port ${PORT}`);
});