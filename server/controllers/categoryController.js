const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

const { generateJSONResponse } = require("../helpers/helpers");

// @desc   Get Collection data
// @route  GET /api/collection
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).send(generateJSONResponse("SUCCESS - Collections", categories));
});

// @desc   Get Category data
// @route  GET /api/category
// @access Public
const getCategory = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - Category GET"));
});

// @desc   Post Category data
// @route  POST /api/category
// @access Public
const postCategory = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - Category POST"));
});

// @desc   Put Category data
// @route  PUT /api/category
// @access Public
const putCategory = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - Category PUT"));
});

// @desc   Delete Category data
// @route  DELETE /api/category
// @access Public
const deleteCategory = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - Category DELETE"));
});

module.exports = {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory
}
