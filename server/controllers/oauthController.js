const passport = require('passport');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const { generateJSONResponse } = require("../helpers/helpers");
const { nextTick } = require('process');

const CLIENT_URL = process.env.NODE_CLIENT_URL

// @desc   Get Github OAuth data
// @route  GET /api/oauth/github
// @access Private
const getOAuth = asyncHandler(async (req, res) => {
  res.status(200).json(generateJSONResponse("SUCCESS"))
});

// @desc   Github login callback
// @route  GET /api/oauth/github-callback
// @access Private
const getGithubCallback = asyncHandler(async (req, res) => {
  // console.debug(`[DEBUG] - ${JSON.stringify(req.user)}`);
  res.redirect(CLIENT_URL + '/app/');
  // res.status(200).json(generateJSONResponse("SUCCESS", req.user));
});

// @desc   Post User data
// @route  POST /api/user
// @access Private
const getSignin = asyncHandler(async (req, res) => {
  res.redirect(CLIENT_URL + "/app/Login");
});

// @desc   Post User data
// @route  POST /api/user
// @access Private
const postSignout = asyncHandler(async (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
  });
});

module.exports = {
  getOAuth,
  getGithubCallback,
  getSignin,
  postSignout,
}
