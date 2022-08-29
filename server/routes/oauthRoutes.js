const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
  getOAuth,
  postOAuth,
  getGithubCallback,
  postSignup,
  postSignin,
  postSignout,
} = require("../controllers/oauthController");

router.get('/github-callback', passport.authenticate('github', { failureRedirect: '/signin' }), getGithubCallback);
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }), getOAuth);
router.post('/github', postOAuth);
router.post('/signup', postSignup);
router.post('/signin', postSignin);
router.post('/signout', postSignout);

module.exports = router
