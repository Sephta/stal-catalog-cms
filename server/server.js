const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

connectDB();

const api = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.NODE_MONGO_URI
const SERVER_CALLBACK = process.env.NODE_SERVER_URL + "/api/oauth/github-callback" || "http://localhost:3000/api/oauth/github-callback"
const GITHUB_CLIENT_ID = process.env.NODE_GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.NODE_GITHUB_CLIENT_SECRET
const SESSION_SECRET = process.env.NODE_SESSION_SECRET

// Passport session setup
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: SERVER_CALLBACK,
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      return done(null, profile);
    });
  }
))

// Setup Middleware
api.use( cors() );
api.use( express.json() );
api.use( express.urlencoded({ extended: false }) );
api.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }));
api.use( passport.initialize() );
api.use( passport.initialize() );

api.listen(
  PORT,
  (props) => console.log(`App alive on http://localhost:${PORT}`), // Callback
);

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/home')
}

api.get('/', ensureAuthenticated, (req, res) => {
  res.status(200).send(`
    <h1>Express RESTAPI Root...</h1>
  `);
});

api.get(`/home`, (req, res) => {
  res.status(200).json({
    ping: `pong`,
  });
});

api.use('/api/mongoTest', require('./routes/mongoTestRoutes'));
api.use('/api/user', require('./routes/userRoutes'));
api.use('/api/oauth', require('./routes/oauthRoutes'));
