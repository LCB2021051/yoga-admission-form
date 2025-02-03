const { User } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  const { name, phone_number, age, gender } = req.body;

  // ✅ Validate Age
  if (age < 18 || age > 65) {
    return res
      .status(400)
      .json({ message: "❌ Age must be between 18 and 65." });
  }

  // ✅ Validate Gender
  if (!["Male", "Female", "Other"].includes(gender)) {
    return res.status(400).json({ message: "❌ Invalid gender selection!" });
  }

  try {
    // ✅ Check if Phone Number is Already Registered
    const existingUser = await User.findOne({ where: { phone_number } });
    if (existingUser) {
      return res.status(400).json({ message: "❌ User already exists!" });
    }

    // ✅ Create New User
    const user = await User.create({ name, phone_number, age, gender });

    // ✅ Generate JWT Token
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "✅ User registered successfully!",
      user,
      token, // ✅ Return Token for Auto-Login
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error registering user", error });
  }
};

// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching users", error });
  }
};

// ✅ Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "❌ User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching user", error });
  }
};

// ✅ Update User
exports.updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, phone_number, age, gender } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "❌ User not found!" });
    }

    // ✅ Validate Gender before updating
    if (gender && !["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({ message: "❌ Invalid gender selection!" });
    }

    await user.update({ name, phone_number, age, gender });

    res.status(200).json({ message: "✅ User updated successfully!", user });
  } catch (error) {
    res.status(500).json({ message: "❌ Error updating user", error });
  }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "❌ User not found!" });
    }

    await user.destroy();
    res.status(200).json({ message: "✅ User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error deleting user", error });
  }
};
