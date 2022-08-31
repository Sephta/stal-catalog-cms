const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');

const {
  getUser,
  postUser,
  putUser,
  deleteUser,
  postLogin,
  getMe,
} = require('../controllers/userController');

router.get('/', getUser);
router.post('/register', postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

router.post('/login', postLogin);
// router.get('/me', getMe);
router.get('/me', authenticate, getMe);

module.exports = router;