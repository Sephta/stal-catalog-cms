const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { debugEndpoint } = require('../helpers/helpers');

const {
  getSubCollections,
  getSubCollection,
  postSubCollection,
  putSubCollection,
  deleteSubCollection,
} = require('../controllers/subCollectionController');

router.get('/', debugEndpoint, getSubCollections);
router.get('/:id', debugEndpoint, getSubCollection);
router.post('/', debugEndpoint, postSubCollection);
router.put('/:name', debugEndpoint, postSubCollection);
router.delete('/:name', debugEndpoint, postSubCollection);

module.exports = router;