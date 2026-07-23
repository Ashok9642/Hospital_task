const User = require('../models/User');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const asyncHandler = require('../middleware/asyncHandler');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error('User Already Existed');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const savedUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 'admin',
  });

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: savedUser,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error('Invalid Username Or Password');
    error.statusCode = 400;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error('Invalid Username Or Password');
    error.statusCode = 400;
    throw error;
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 5 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: 'Login Success',
    role: user.role,
  });
});

const weather_report = asyncHandler(async (req, res) => {
  const response = await axios.get(
    'https://api.open-meteo.com/v1/forecast?latitude=17.38&longitude=78.48&current_weather=true',
  );

  res.status(200).json(response.data);
});

module.exports = {
  signUp,
  login,
  weather_report,
};
