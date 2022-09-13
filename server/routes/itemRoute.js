const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { debugEndpoint } = require('../helpers/helpers');

const {
  getItems,
  getItem,
  postItem,
  postItems,
  putItem,
  deleteItem,
} = require('../controllers/itemController');

router.get('/', debugEndpoint, getItems);
router.get('/:id', debugEndpoint, getItem);
router.post('/', debugEndpoint, postItem);
router.post('/multi', debugEndpoint, postItems)
router.put('/:name', debugEndpoint, putItem);
router.delete('/:name', debugEndpoint, deleteItem);

module.exports = router;