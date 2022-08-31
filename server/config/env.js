const config = {
  PORT : process.env.PORT || 5000,
  NODE_ENV : process.env.NODE_ENV,
  NODE_CLIENT_URL : process.env.NODE_CLIENT_URL,
  NODE_SERVER_URL : process.env.NODE_SERVER_URL,
  NODE_MONGO_URI : process.env.NODE_MONGO_URI,
  NODE_GITHUB_CLIENT_ID : process.env.NODE_GITHUB_CLIENT_ID,
  NODE_GITHUB_CLIENT_SECRET : process.env.NODE_GITHUB_CLIENT_SECRET,
  NODE_SESSION_SECRET : process.env.NODE_SESSION_SECRET,
  GITHUB_CALLBACK_REDIRECT : process.env.GITHUB_CALLBACK_REDIRECT,
}

module.exports = config;