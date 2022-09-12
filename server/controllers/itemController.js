const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');

const { generateJSONResponse } = require("../helpers/helpers");

// @desc   Get Collection data
// @route  GET /api/collection
// @access Public
const getItems = asyncHandler(async (req, res) => {
  const collections = await Collection.find();
  res.status(200).send(generateJSONResponse("SUCCESS - Collections", collections));
});

// @desc   Get Item data
// @route  GET /api/item
// @access Public
const getItem = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - Item GET"));
});

// @desc   Post Item data
// @route  POST /api/item
// @access Public
const postItem = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - Item POST"));
});

// @desc   Put Item data
// @route  PUT /api/item
// @access Public
const putItem = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - Item PUT"));
});

// @desc   Delete Item data
// @route  DELETE /api/item
// @access Public
const deleteItem = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - Item DELETE"));
});

module.exports = {
  getItems,
  getItem,
  postItem,
  putItem,
  deleteItem
}
