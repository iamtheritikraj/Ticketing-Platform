const User = require('../models/User');

const protect = async (req, res, next) => {
  if (req.session && req.session.userId) {
    req.user = req.session.user;
    next();
  } else {
    return res.status(401).json({ message: 'Not authorized, please log in' });
  }
};

module.exports = { protect };

