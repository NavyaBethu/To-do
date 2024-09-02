const jwt = require('jsonwebtoken');

const generateToken = (userId,organizationId,username) => {
  return jwt.sign({ userId, organizationId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
};

const verifyToken = (token) => {
  return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, );
};

module.exports = { generateToken, verifyToken };
