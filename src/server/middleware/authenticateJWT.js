// src/server/middleware/authenticateJWT.js

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    console.log('No auth header'); // Debugging line
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  // const token = authHeader.split(' ')[1];
  console.log('Received token:', token);

  // if (!token) {
  //   console.log('Token missing'); // Debugging line
  //   return res.status(401).json({ error: 'Access denied, token missing' });
  // }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    console.log('Token verified:', verified); // Debugging line
    next();
  } catch (err) {
    console.log('Invalid token:', err.message);
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateJWT;

