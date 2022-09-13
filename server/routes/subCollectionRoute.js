const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { debugEndpoint } = require('../helpers/helpers');

const {
  getSubCollections,
  getSubCollection,
  postSubCollection,
  postSubCollections,
  putSubCollection,
  deleteSubCollection,
} = require('../controllers/subCollectionController');

router.get('/', debugEndpoint, getSubCollections);
router.get('/:id', debugEndpoint, getSubCollection);
router.post('/', debugEndpoint, postSubCollection);
router.post('/multi', debugEndpoint, postSubCollections);
router.put('/:name', debugEndpoint, putSubCollection);
router.delete('/:name', debugEndpoint, deleteSubCollection);

module.exports = router;