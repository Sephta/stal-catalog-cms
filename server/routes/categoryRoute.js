const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { debugEndpoint } = require('../helpers/helpers');

const {
  getCategories,
  getCategory,
  postCategory,
  postCategories,
  putCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router.get('/', debugEndpoint, getCategories);
router.get('/:id', debugEndpoint, getCategory);
router.post('/', debugEndpoint, postCategory);
router.post('/multi', debugEndpoint, postCategories);
router.put('/:name', debugEndpoint, putCategory);
router.delete('/:name', debugEndpoint, deleteCategory);

module.exports = router;