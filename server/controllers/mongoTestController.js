const asyncHandler = require('express-async-handler');
const MongoTest = require('../models/mongoTestModel');

const { generateJSONResponse } = require("../helpers/helpers")

// @desc   Get MongoTest data
// @route  GET /api/mongoTest
// @access Private
const getMongoTest = asyncHandler(async (req, res) => {
  let mongoTests = await MongoTest.find();

  res.status(200).json(generateJSONResponse("SUCCESS", mongoTests))
});

// @desc   Create MongoTest data
// @route  POST /api/mongoTest
// @access Private
const postMongoTest = asyncHandler(async (req, res) => {
  if (!req?.body.test) {
    res.status(400)
    throw new Error('Please provide a test field.')
  }

  console.debug(`[DEBUG] - ${JSON.stringify(req?.body)}`);

  const mongoTest = await MongoTest.create({
    test: req.body.test,
  });

  res.status(200).json(generateJSONResponse("Adding MongoTest Data...", mongoTest))
});

// @desc   Get MongoTest data
// @route  GET /api/mongoTest
// @access Private
const putMongoTest = asyncHandler(async (req, res) => {
  let { id } = req.params
  const mongoTest = await MongoTest.findById(id);

  if (!mongoTest) {
    res.status(400);
    throw new Error(`MongoTest with id: ${id} not found.`);
  }

  const updatedMongoTest = await MongoTest.findByIdAndUpdate(id, req.body);

  res.status(200).json(generateJSONResponse("SUCCESS", updatedMongoTest));
});

// @desc   Get MongoTest data
// @route  GET /api/mongoTest
// @access Private
const deleteMongoTest = asyncHandler(async (req, res) => {
  let { id } = req.params
  const mongoTest = await MongoTest.findById(id);

  if (!mongoTest) {
    res.status(400);
    throw new Error(`MongoTest with id: ${id} not found.`);
  }

  await MongoTest.findByIdAndDelete(id);

  res.status(200).json(generateJSONResponse("SUCCESS"));
});

module.exports = {
  getMongoTest,
  postMongoTest,
  putMongoTest,
  deleteMongoTest,
}
