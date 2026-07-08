const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');
const refreshTokenController = require('../controllers/refreshTokenController');
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/refresh-token', refreshTokenController);
router.get('/auth/me', verifyToken, (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
});
router.get('/weather_report', userController.weather_report);

module.exports = router;
