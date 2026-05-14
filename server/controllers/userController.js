const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ name: 1 });
  res.json({ success: true, data: users });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const updates = {};
  if (name) updates.name = name;
  if (email) updates.email = email;

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: user });
});
