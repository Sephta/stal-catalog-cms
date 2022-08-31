const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.NODE_MONGO_URI)
    console.debug(`[DEBUG] - MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[ERROR] - ${error}`);
    console.error(`[ERROR] - Failed to connect to MongoDB.`);
    process.exit(1);
  }
}

module.exports = connectDB