import express from 'express';
import cors from 'cors';



const app = express();

app.use(express.json());
app.use(cors()); // add more security checks to cors 

app.use('/api', require('./routes'));


// Add error handler 


// register routes

const PORT = process.env.PORT || 3000;  // use node_env

app.listen(PORT, function start() {
	console.log(`Server Listening for connections on port ${PORT}`);
});