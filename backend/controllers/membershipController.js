const { Membership, User, Payment, Batch } = require("../models");

// ✅ Get All Memberships for a User
exports.getMembership = async (req, res) => {
  try {
    const { user_id } = req.params;
    const memberships = await Membership.findAll({
      where: { user_id },
      include: [
        { model: Batch, attributes: ["timing"] },
        { model: Payment, attributes: ["amount", "status"] },
      ],
    });
    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching memberships.", error });
  }
};

exports.addMembership = async (req, res) => {
  try {
    const { user_id, batch_id, payment_id } = req.body;

    // ✅ Check if user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "❌ User not found!" });
    }

    // ✅ Check if payment exists and is completed
    const payment = await Payment.findByPk(payment_id);
    if (!payment || payment.status !== "Completed") {
      return res.status(400).json({ message: "❌ Payment not completed!" });
    }

    // ✅ Get all memberships of the user
    const userMemberships = await Membership.findAll({ where: { user_id } });

    // ✅ Check if any membership is still active
    const hasActiveMembership = userMemberships.some(
      (m) => new Date(m.expiry_date) > new Date()
    );

    if (hasActiveMembership) {
      return res
        .status(400)
        .json({ message: "❌ User already has an active membership!" });
    }

    // ✅ Calculate expiry date (1 month from today)
    const expiry_date = new Date();
    expiry_date.setMonth(expiry_date.getMonth() + 1);

    // ✅ Create a new membership
    const newMembership = await Membership.create({
      user_id,
      batch_id,
      payment_id,
      expiry_date,
    });

    res.status(201).json({
      message: "✅ Membership added successfully!",
      membership: newMembership,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error adding membership.", error });
  }
};
