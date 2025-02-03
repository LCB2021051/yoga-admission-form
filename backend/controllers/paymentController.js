const { Payment, User } = require("../models");

// ✅ Process a Payment
exports.processPayment = async (req, res) => {
  const { user_id, amount } = req.body;

  try {
    // ✅ Validate User
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "❌ User not found!" });
    }

    // ✅ Create Payment Record
    const payment = await Payment.create({
      user_id,
      amount: amount || 500, // Default amount if not provided
      status: "Completed",
    });

    res.status(201).json({
      message: "✅ Payment successful!",
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error processing payment", error });
  }
};

// ✅ Get All Payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [{ model: User, attributes: ["name", "phone_number"] }],
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching payments", error });
  }
};

// ✅ Get Payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const { payment_id } = req.params;
    const payment = await Payment.findByPk(payment_id, {
      include: [{ model: User, attributes: ["name", "phone_number"] }],
    });

    if (!payment) {
      return res.status(404).json({ message: "❌ Payment not found!" });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching payment", error });
  }
};
