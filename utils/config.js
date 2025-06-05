require('dotenv').config();

const {
  PORT = 3002,
  MONGO_URL = 'mongodb://127.0.0.1:27017/news-explorer_db',
  JWT_SECRET = 'dev-secret-key-not-for-production',
  NODE_ENV = 'development',
} = process.env;

if (NODE_ENV === 'production' && !JWT_SECRET) {
  throw new Error("❌ JWT_SECRET must be set in production");
}

module.exports = {
  PORT,
  MONGO_URL,
  JWT_SECRET,
  NODE_ENV,
};