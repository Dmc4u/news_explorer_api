const {
  PORT = 3002,
  MONGO_URL = 'mongodb://127.0.0.1:27017/news-explorer_db',
  JWT_SECRET = 'dev-secret-key-not-for-production.',
  NODE_ENV = 'development',
  NEWS_API_KEY,
} = process.env;

if (NODE_ENV === 'production' && !JWT_SECRET) {
  throw new Error("❌ JWT_SECRET must be set in production");
}
if (!NEWS_API_KEY) {
  throw new Error("❌ NEWS_API_KEY must be set");
}

module.exports = {
  PORT,
  MONGO_URL,
  JWT_SECRET,
  NODE_ENV,
  NEWS_API_KEY,
};