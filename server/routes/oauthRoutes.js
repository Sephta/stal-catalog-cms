const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
  getOAuth,
  getGithubCallback,
  getSignin,
  postSignout,
} = require("../controllers/oauthController");

router.get('/github-callback', passport.authenticate('github', { failureRedirect: '/signin' }), getGithubCallback);
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }), getOAuth);
router.get('/signin', getSignin);
router.post('/signout', postSignout);

module.exports = router
