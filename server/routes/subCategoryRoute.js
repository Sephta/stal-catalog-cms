const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { debugEndpoint } = require('../helpers/helpers');

const {
  getSubCategories,
  getSubCategory,
  postSubCategory,
  putSubCategory,
  deleteSubCategory,
} = require('../controllers/subCategoryController');

router.get('/', debugEndpoint, getSubCategories);
router.get('/:name', debugEndpoint, getSubCategory);
router.post('/:name', debugEndpoint, postSubCategory);
router.put('/:name', debugEndpoint, putSubCategory);
router.delete('/:name', debugEndpoint, deleteSubCategory);

module.exports = router;