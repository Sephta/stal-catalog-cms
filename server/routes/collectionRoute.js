const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { debugEndpoint } = require('../helpers/helpers');

const {
  getCollections,
  getCollection,
  postCollection,
  putCollection,
  deleteCollection,
} = require('../controllers/collectionController');

router.get('/', debugEndpoint, getCollections);
router.get('/:name', debugEndpoint, getCollection);
router.post('/', debugEndpoint, postCollection);
router.put('/:name', debugEndpoint, putCollection);
router.delete('/:name', debugEndpoint, deleteCollection);

module.exports = router;