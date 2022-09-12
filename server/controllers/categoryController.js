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
  const { id } = req.params;

  const category = await Category.findById(id);

  if (category) {
    res.status(200).send(generateJSONResponse("SUCCESS - Collection", {
      name: category.name,
      subCategories: category.subCategories,
    }));
  } else {
    res.status(400);
    throw new Error(`category with name: ${name} not found.`);
  }
});

// @desc   Post Category data
// @route  POST /api/category
// @access Public
const postCategory = asyncHandler(async (req, res) => {
  const {
    name,
    subCategories,
  } = req.body;

  if (!name || !subCategories) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  const categoryExists = await Category.findOne({name});

  if (categoryExists) {
    res.status(400)
    throw new Error(`Item with name: ${name} already exists.`);
  }

  const category = await Category.create({
    name,
    subCategories
  });

  if (category) {
    res.status(201).send(generateJSONResponse("SUCCESS - Collection created.", {
      name: category.name,
      subCategories: category.subCategories
    }));
  } else {
    res.status(400)
    throw new Error(`Error creating new collection with name: ${name}`);
  }
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
