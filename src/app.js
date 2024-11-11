require('dotenv').config();
const express = require('express');
const cors = require('cors')
const router = require('./routes');


const app = express();

app.use(express.json());
app.use(cors(`Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With`))
app.use('/api', router);

module.exports = app;
