const express = require('express');
const { registerUser, loginUser, getUserProfile,logoutUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',protect,logoutUser);
router.get('/profile', protect, getUserProfile);
router.get('/check-auth', (req, res) => {
    if (req.session && req.session.userId) {
      res.status(200).json({ isAuthenticated: true });
    } else {
      res.status(401).json({ isAuthenticated: false });
    }
  });


module.exports = router;
