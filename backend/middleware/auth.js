const { verifyTokenHelper } = require('../helpers/jwtHelper');

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log('token values cookies', req.cookies);

  console.log('token value:', token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = verifyTokenHelper(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
