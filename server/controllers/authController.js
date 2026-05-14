const User = require('../models/User');
const { generateToken } = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    data: { user, token },
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    data: { user, token },
  });
});

exports.getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});
