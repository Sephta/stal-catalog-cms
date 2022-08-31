const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const { generateJSONResponse, generateToken } = require("../helpers/helpers")

// @desc   Get User data
// @route  GET /api/user/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).send(generateJSONResponse("SUCCESS - User", users));
});

// @desc   Post User data
// @route  POST /api/user
// @access Private
const postUser = asyncHandler(async (req, res) => {

  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  const userExists = await User.findOne({email});

  if (userExists) {
    res.status(400)
    throw new Error("User already exists.");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json(generateJSONResponse("SUCCESS", {
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    }));
  } else {
    res.status(400)
    throw new Error("Invalid user data");
  }
});

// @desc   Put User data
// @route  PUT /api/user/:id
// @access Private
const putUser = asyncHandler(async (req, res) => {
  res.status(200).json(generateJSONResponse("SUCCESS"))
});

// @desc   Delete User data
// @route  DELETE /api/user/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json(generateJSONResponse("SUCCESS"))
});

// @desc   Get User data
// @route  GET /api/user/:id
// @access Private
const postLogin = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    res.status(400)
    throw new Error("No email or password provided");
  }

  const user = await User.findOne({email});

  if (user && await bcrypt.compare(password, user.password)) {
    res.send(generateJSONResponse("SUCCESS", 
      {
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      }
    ));
  } else {
    res.status(400)
    throw new Error(`Invalid credentials.`);
  }
});

// @desc   Get User data
// @route  GET /api/user/:id
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);

  res.status(200).send(generateJSONResponse("SUCCESS", {
    id: _id,
    username: username,
    email: email,
  }));
});

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
  postLogin,
  getMe,
}
