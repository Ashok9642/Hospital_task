const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../utils/token');

const refreshTokenController = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = generateAccessToken({
      _id: decoded.id,
      role: decoded.role,
    });

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 10 * 1000,
    });

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};

module.exports = refreshTokenController;
