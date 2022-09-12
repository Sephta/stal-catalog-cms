const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { debugEndpoint } = require('../helpers/helpers');

const {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router.get('/', debugEndpoint, getCategories);
router.get('/:name', debugEndpoint, getCategory);
router.post('/:name', debugEndpoint, postCategory);
router.put('/:name', debugEndpoint, putCategory);
router.delete('/:name', debugEndpoint, deleteCategory);

module.exports = router;