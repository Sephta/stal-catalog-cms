const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { debugEndpoint } = require('../helpers/helpers');

const {
  getSubCategories,
  postSubCategories,
  getSubCategory,
  postSubCategory,
  putSubCategory,
  deleteSubCategory,
} = require('../controllers/subCategoryController');

router.get('/', debugEndpoint, getSubCategories);
router.get('/:id', debugEndpoint, getSubCategory);
router.post('/', debugEndpoint, postSubCategory);
router.post('/multi', debugEndpoint, postSubCategories)
router.put('/:name', debugEndpoint, putSubCategory);
router.delete('/:name', debugEndpoint, deleteSubCategory);

module.exports = router;