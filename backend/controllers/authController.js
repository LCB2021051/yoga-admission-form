const { User } = require("../models");
const speakeasy = require("speakeasy");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const otpStore = {}; // ✅ Temporary OTP storage (use Redis for production)

// ✅ Phone Number Validation Function
const validatePhoneNumber = (phone_number) => {
  const phoneRegex = /^[6-9]\d{9}$/; // ✅ Ensures 10-digit valid mobile number
  return phoneRegex.test(phone_number);
};

// ✅ Send OTP
exports.sendOTP = async (req, res) => {
  const { phone_number } = req.body;

  // ❌ Validate phone number before proceeding
  if (!validatePhoneNumber(phone_number)) {
    return res.status(400).json({
      message: "❌ Invalid phone number! Enter a valid 10-digit number.",
    });
  }

  try {
    const otp = speakeasy.totp({
      secret: process.env.OTP_SECRET,
      encoding: "base32",
      step: 300, // ✅ OTP valid for 5 minutes
    });

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");
    otpStore[phone_number] = { hashedOTP, expiresAt: Date.now() + 300000 }; // ✅ Store hashed OTP with expiry

    console.log(`🔢 OTP for ${phone_number}: ${otp}`); // Simulate OTP sending (use Twilio in production)

    res.status(200).json({ message: "✅ OTP sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error sending OTP.", error });
  }
};

// ✅ Verify OTP & Login
exports.verifyOTP = async (req, res) => {
  const { phone_number, otp } = req.body;

  try {
    const storedOTP = otpStore[phone_number];

    // ❌ Check if OTP exists & is valid
    if (!storedOTP || storedOTP.expiresAt < Date.now()) {
      return res.status(400).json({ message: "❌ OTP expired or not found!" });
    }

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    if (storedOTP.hashedOTP !== hashedOTP) {
      return res.status(400).json({ message: "❌ Invalid OTP!" });
    }

    let user = await User.findOne({ where: { phone_number } });

    // ✅ If user does not exist, return status `201` for frontend to prompt registration
    if (!user) {
      return res
        .status(201)
        .json({ message: "✅ Ready to register new user." });
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    delete otpStore[phone_number]; // ✅ Remove OTP after successful login

    res.status(200).json({
      message: "✅ Login successful!",
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        phone_number: user.phone_number,
        age: user.age,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error verifying OTP.", error });
  }
};
