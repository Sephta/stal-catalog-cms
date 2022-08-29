const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const { generateJSONResponse } = require("../helpers/helpers")

// @desc   Get User data
// @route  GET /api/user/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {

  res.status(200).json(generateJSONResponse("SUCCESS"))
});

// @desc   Post User data
// @route  POST /api/user
// @access Private
const postUser = asyncHandler(async (req, res) => {
  res.status(200).json(generateJSONResponse("SUCCESS"))
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

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
}
