const asyncHandler = require('express-async-handler');
const Collection = require('../models/collectionModel');

const { generateJSONResponse } = require("../helpers/helpers");

// @desc   Get Collection data
// @route  GET /api/collection
// @access Public
const getCollections = asyncHandler(async (req, res) => {
  const collections = await Collection.find();
  res.status(200).send(generateJSONResponse("SUCCESS - Collections", collections));
});

// @desc   Get Collection data
// @route  GET /api/collection
// @access Public
const getCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const collection = await Collection.findById(id);

  if (collection) {
    res.status(200).send(generateJSONResponse("SUCCESS - Collection", {
      id: collection.id,
      name: collection.name,
      subCollections: collection.subCollections,
    }));
  } else {
    res.status(400);
    throw new Error(`Collection with name: ${name} not found.`);
  }
});

// @desc   Post Collection data
// @route  POST /api/collection
// @access Public
const postCollection = asyncHandler(async (req, res) => {
  const {
    name,
    subCollections,
  } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  const collectionExists = await Collection.findOne({name});

  if (collectionExists) {
    res.status(400)
    throw new Error(`Collection with name: ${name} already exists.`);
  }

  const collection = await Collection.create({
    name,
    subCollections,
  });

  if (collection) {
    res.status(201).send(generateJSONResponse("SUCCESS - Collection created.", {
      name: collection.name,
      subCollections: collection.subCollections,
    }));
  } else {
    res.status(400)
    throw new Error(`Error creating new collection with name: ${name}`);
  }
});

// @desc   Put Collection data
// @route  PUT /api/collection
// @access Public
const putCollection = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - Collections PUT"));
});

// @desc   Delete Collection data
// @route  DELETE /api/collection
// @access Public
const deleteCollection = asyncHandler(async (req, res) => {
  res.status(200).send(generateJSONResponse("SUCCESS - Collections DELETE"));
});

module.exports = {
  getCollections,
  getCollection,
  postCollection,
  putCollection,
  deleteCollection,
}