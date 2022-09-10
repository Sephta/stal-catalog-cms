const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Collection = require('../models/collectionModel');

const { generateJSONResponse, generateToken } = require("../helpers/helpers");
const { json } = require('express');

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
  const { name } = req.params;

  const collection = await Collection.findOne({
    name: name,
  });

  if (collection) {
    res.status(200).send(generateJSONResponse("SUCCESS - Collection", {
      name: collection.name,
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
  const { name } = req.body;

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
    name
  });

  if (collection) {
    res.status(201).send(generateJSONResponse("SUCCESS - Collection created.", {
      name: collection.name,
    }));
  } else {
    res.status(400)
    throw new Error(`Error creating new collection with name: ${name}`);
  }
});

module.exports = {
  getCollections,
  getCollection,
  postCollection,
}