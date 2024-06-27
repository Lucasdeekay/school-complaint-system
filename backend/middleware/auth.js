const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config').jwtSecret;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).send({ error: 'Token not found' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ error: 'Invalid token' });
    }
    req.userId = user.userId;
    next();
  });
};

module.exports = verifyToken;
