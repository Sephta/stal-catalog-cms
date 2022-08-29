const express = require('express');
const router = express.Router();

const { 
  getUser, 
  postUser, 
  putUser, 
  deleteUser 
} = require("../controllers/userController");

router.get('/:id', getUser)

router.post('/', postUser)

router.put('/:id', putUser)

router.delete('/:id', deleteUser)

module.exports = router
