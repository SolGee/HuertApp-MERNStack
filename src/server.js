const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect DB

connectDB();

app.get('/', (req, res) => res.send('API Running'));

//This variable will help us when we deploy to Heroku, cause it will give us the port number
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));