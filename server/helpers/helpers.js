const jwt = require('jsonwebtoken');
const env = require('../config/env');

/** Generate boilerplate response object
 * 
 * @param {String} message Response result string (i.e. if status 200 then message SUCCESS)
 * @param {Object} result 
 * 
 * @returns Object of structure: { message: ___ , result: ___ }
 */
const generateJSONResponse = (message, result = null) => {
  return (result == null) ? {message: message} : {message: message, result: result};
}

const debugEndpoint = (req, res, next) => {
  let timestamp = new Date().toLocaleString();
  console.debug(`[DEBUG] <TYPE: \'${req.method}\'> | <ENDPOINT: \'${req.originalUrl}\'> | <TIMESTAMP: '${timestamp}'>`);
  next();
}

// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id }, 
    env.NODE_SESSION_SECRET,
    {
      expiresIn: '1d'
    }
  );
}

module.exports = { generateJSONResponse, debugEndpoint, generateToken};