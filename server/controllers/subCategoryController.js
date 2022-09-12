const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategoryModel');

const { generateJSONResponse } = require("../helpers/helpers");

// @desc   Get Collection data
// @route  GET /api/collection
// @access Public
const getSubCategories = asyncHandler(async (req, res) => {
  const collections = await Collection.find();
  res.status(200).send(generateJSONResponse("SUCCESS - Collections", collections));
});

// @desc   Get SubCategory data
// @route  GET /api/subcategory
// @access Public
const getSubCategory = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - SubCategory GET"));
});

// @desc   Post SubCategory data
// @route  POST /api/subcategory
// @access Public
const postSubCategory = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - SubCategory POST"));
});

// @desc   Put SubCategory data
// @route  PUT /api/subcategory
// @access Public
const putSubCategory = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - SubCategory PUT"));
});

// @desc   Delete SubCategory data
// @route  DELETE /api/subcategory
// @access Public
const deleteSubCategory = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - SubCategory DELETE"));
});

module.exports = {
  getSubCategories,
  getSubCategory,
  postSubCategory,
  putSubCategory,
  deleteSubCategory
}
