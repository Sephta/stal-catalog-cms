const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { debugEndpoint } = require('../helpers/helpers');

const {
  getUser,
  postUser,
  putUser,
  deleteUser,
  postLogin,
  getMe,
} = require('../controllers/userController');

router.get('/', debugEndpoint, getUser);
router.post('/register', debugEndpoint, postUser);
router.put('/:id', debugEndpoint, putUser);
router.delete('/:id', debugEndpoint, deleteUser);

router.post('/login', debugEndpoint, postLogin);
// router.get('/me', getMe);
router.get('/me', debugEndpoint, authenticate, getMe);

module.exports = router;