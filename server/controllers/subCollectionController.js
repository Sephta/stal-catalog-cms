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
  const { id } = req.params;

  const subCollection = await SubCollection.findById(id);

  if (subCollection) {
    res.status(200).send(generateJSONResponse("SUCCESS - Collection", {
      id: subCollection.id,
      name: subCollection.name,
      categories: subCollection.categories,
    }));
  } else {
    res.status(400);
    throw new Error(`Sub Collection with id: ${id} not found.`);
  }
});

// @desc   Post SubCollections data
// @route  POST /api/subcollection
// @access Public
const postSubCollection = asyncHandler(async (req, res) => {
  const {
    name,
    categories,
  } = req.body;

  if (!name || !categories) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  const subCollectionExists = await SubCollection.findOne({name});

  if (subCollectionExists) {
    res.status(400)
    throw new Error(`SubCollection with name: ${name} already exists.`);
  }

  const subCollection = await SubCollection.create({
    name,
    categories
  });

  if (subCollection) {
    res.status(201).send(generateJSONResponse("SUCCESS - SubCollection created.", {
      name: subCollection.name,
      categories: subCollection.categories
    }));
  } else {
    res.status(400)
    throw new Error(`Error creating new collection with name: ${name}`);
  }
});

// @desc   Return multiple subcollections based on array of ids
// @route  POST /api/subcollection/multi
// @access Public
const postSubCollections = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  const subCollections = await SubCollection.find({'_id' : { $in: ids}}).select('-__v -createdAt -updatedAt');

  if (subCollections) {
    res.status(200).send(generateJSONResponse("SUCCESS - POST multiple SubCollections.", subCollections));
  } else {
    res.status(400);
    throw new Error(`Something went wrong finding Sub Collections: ${JSON.stringify(ids)}.`);
  }
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
  postSubCollections,
  putSubCollection,
  deleteSubCollection
}
