const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const api = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.NODE_MONGO_URI

api.use( cors() );
api.use( express.json() );
api.use( express.urlencoded({ extended: false }) );

api.listen(
  PORT,
  (props) => console.log(`App alive on http://localhost:${PORT}`), // Callback
);

api.get('/', (req, res) => {
  res.status(200).send(`
    <h1>Express RESTAPI Root...</h1>
  `);
});

api.get(`/home`, (req, res) => {
  res.status(200).json({
    ping: `pong`,
  });
});

api.use('/api/mongoTest', require('./routes/mongoTestRoutes'))
