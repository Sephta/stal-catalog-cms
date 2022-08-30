const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.NODE_MONGO_URI,
  SERVER_CALLBACK: process.env.NODE_SERVER_URL + "/api/oauth/github-callback" || "http://localhost:3000/api/oauth/github-callback",
  GITHUB_CLIENT_ID: process.env.NODE_GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.NODE_GITHUB_CLIENT_SECRET,
  SESSION_SECRET: process.env.NODE_SESSION_SECRET,
  GITHUB_CALLBACK_REDIRECT: process.env.GITHUB_CALLBACK_REDIRECT,
}

module.exports = config;