const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const env = require('../config/env');
const User = require('../models/userModel');

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token from header
      token = req.headers.authorization.split(' ')[1]; // splits on space to get the token from "Bearer <token>"

      // Verify token
      const decoded = jwt.verify(token, env.NODE_SESSION_SECRET);
      
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      next();

    } catch (err) {
      console.error(`[ERROR] - ${err}`);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

module.exports = { authenticate };