const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

const signUp = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User Already Existed' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role ? role : 'admin', // ✅ main logic
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: savedUser,
    });
  } catch (err) {
    console.log('ERROR:', err);
    next(err);
  }
};

//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         message: 'Invalid Username Or Password',
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         message: 'Invalid Username Or Password',
//       });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     console.log(token);
//     res.cookie('token', token, {
//       httpOnly: true,
//     });

//     res.status(200).json({
//       message: 'Login Success',
//       status: 200,
//     });
//   } catch (err) {
//     next(err); // 👉 THIS sends to global error handler
//   }
// };
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Username Or Password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Username Or Password' });
    }

    // 🔥 CREATE TOKENS
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 5 * 60 * 1000, // 5 minutes
    });

    // refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login Success',
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};
const weather_report = async (req, res) => {
  try {
    const responce = await axios.get(
      'https://api.open-meteo.com/v1/forecast?latitude=17.38&longitude=78.48&current_weather=true',
    );
    return res.status(200).json(responce.data);
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, login, weather_report };
