const express = require('express');
const router = express.Router();

const { 
  getMongoTest, 
  postMongoTest, 
  putMongoTest, 
  deleteMongoTest 
} = require("../controllers/mongoTestController");

router.get('/', getMongoTest)

router.post('/', postMongoTest)

router.put('/:id', putMongoTest)

router.delete('/:id', deleteMongoTest)

module.exports = router
