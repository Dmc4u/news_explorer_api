if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET must be set in production");
}

const { JWT_SECRET = 'dev-secret-key' } = process.env;

module.exports = {
  JWT_SECRET,
};
