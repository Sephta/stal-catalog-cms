const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { debugEndpoint } = require('../helpers/helpers');

const {
  getCollections,
  getCollection,
  postCollection,
} = require('../controllers/collectionController');

router.get('/', debugEndpoint, getCollections);
router.get('/:name', debugEndpoint, getCollection);
router.post('/', debugEndpoint, postCollection);

module.exports = router;