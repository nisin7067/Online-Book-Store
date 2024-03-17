const crypto = require('crypto');

const generateJWTSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const jwtSecret = generateJWTSecret(); // Generate a random JWT secret key

module.exports = {
  jwtSecret: jwtSecret,
  mongoURI: 'mongodb://localhost:27017/bookstore'
};
