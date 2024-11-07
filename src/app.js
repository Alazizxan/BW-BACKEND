require('dotenv').config();
const express = require('express');
const http = require('http');

const router = require('./routes');


const app = express();
const server = http.createServer(app);


app.use(express.json())
app.use('/api', router)



server.listen(process.env.PORT, () => console.log(`> Listening on port ${process.env.PORT}`));