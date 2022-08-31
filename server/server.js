const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/database');
const { PORT } = require('./config/env');

connectDB();

const api = express();
api.use( cors() );
api.use( express.json() );
api.use( express.urlencoded({ extended: false }) );

api.listen(
  PORT,
  (props) => console.log(`App alive on http://localhost:${PORT}`), // Callback
);

const { generateJSONResponse, debugEndpoint } = require('./helpers/helpers');

api.get('/', debugEndpoint, (req, res) => {
  // res.status(200).send(generateJSONResponse("SUCCESS - Hello World"));
  res.redirect('/api');
})

const routes = require('./routes');

api.use('/api', routes);
