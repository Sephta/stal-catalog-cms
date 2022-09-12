const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');

const { generateJSONResponse } = require("../helpers/helpers");
const { default: mongoose } = require('mongoose');

// @desc   Get Collection data
// @route  GET /api/collection
// @access Public
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  res.status(200).send(generateJSONResponse("SUCCESS - Collections", items));
});

// @desc   Get Item data
// @route  GET /api/item
// @access Public
const getItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await Item.findById(id);

  if (item) {
    res.status(200).send(generateJSONResponse("SUCCESS - Collection", {
      name: item.name,
      img: item.img,
    }));
  } else {
    res.status(400);
    throw new Error(`category with name: ${name} not found.`);
  }
});

// @desc   Post Item data
// @route  POST /api/item
// @access Public
const postItem = asyncHandler(async (req, res) => {
  const {
    name,
    img,
  } = req.body;

  if (!name || !img) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  const itemExists = await Item.findOne({name});

  if (itemExists) {
    res.status(400)
    throw new Error(`Item with name: ${name} already exists.`);
  }

  const item = await Item.create({
    name,
    img
  });

  if (item) {
    res.status(201).send(generateJSONResponse("SUCCESS - Collection created.", {
      name: item.name,
      img: item.img
    }));
  } else {
    res.status(400)
    throw new Error(`Error creating new collection with name: ${name}`);
  }
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
