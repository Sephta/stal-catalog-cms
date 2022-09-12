const asyncHandler = require('express-async-handler');
const SubCollection = require('../models/subCollectionModel');

const { generateJSONResponse } = require("../helpers/helpers");

// @desc   Get Collection data
// @route  GET /api/collection
// @access Public
const getSubCollections = asyncHandler(async (req, res) => {
  const subCollections = await SubCollection.find();
  res.status(200).send(generateJSONResponse("SUCCESS - Collections", subCollections));
});

// @desc   Get SubCollections data
// @route  GET /api/subcollection
// @access Public
const getSubCollection = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - SubCollections GET"));
});

// @desc   Post SubCollections data
// @route  POST /api/subcollection
// @access Public
const postSubCollection = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - SubCollections POST"));
});

// @desc   Put SubCollections data
// @route  PUT /api/subcollection
// @access Public
const putSubCollection = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - SubCollections PUT"));
});

// @desc   Delete SubCollections data
// @route  DELETE /api/subcollection
// @access Public
const deleteSubCollection = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - SubCollections DELETE"));
});

module.exports = {
  getSubCollections,
  getSubCollection,
  postSubCollection,
  putSubCollection,
  deleteSubCollection
}
