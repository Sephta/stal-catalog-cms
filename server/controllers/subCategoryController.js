const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategoryModel');

const { generateJSONResponse } = require("../helpers/helpers");

// @desc   Get Collection data
// @route  GET /api/collection
// @access Public
const getSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await SubCategory.find();
  res.status(200).send(generateJSONResponse("SUCCESS - Collections", subCategories));
});

// @desc   Get SubCategory data
// @route  GET /api/subcategory
// @access Public
const getSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findById(id);

  if (subCategory) {
    res.status(200).send(generateJSONResponse("SUCCESS - Collection", {
      name: subCategory.name,
      items: subCategory.items,
    }));
  } else {
    res.status(400);
    throw new Error(`category with name: ${name} not found.`);
  }
});

// @desc   Post SubCategory data
// @route  POST /api/subcategory
// @access Public
const postSubCategory = asyncHandler(async (req, res) => {
  const {
    name,
    items,
  } = req.body;

  if (!name || !items) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  const subCategoryExists = await SubCategory.findOne({name});

  if (subCategoryExists) {
    res.status(400)
    throw new Error(`Item with name: ${name} already exists.`);
  }

  const subCategory = await SubCategory.create({
    name,
    items
  });

  if (subCategory) {
    res.status(201).send(generateJSONResponse("SUCCESS - Collection created.", {
      name: subCategory.name,
      items: subCategory.items,
    }));
  } else {
    res.status(400)
    throw new Error(`Error creating new collection with name: ${name}`);
  }
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
