const jwt = require('jsonwebtoken');
const User = require('../models/User');

function protect(req, res, next) {
  const authHeader = req.headers.authorization || req.cookies?.token;
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, token missing'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
    next(new Error('Not authorized, token invalid'));
  }
}

function admin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    next(new Error('Admin access denied'));
  }
}

module.exports = { protect, admin };
