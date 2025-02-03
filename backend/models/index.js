const { sequelize, connectDB } = require("../config/database");
const User = require("./User");
const Batch = require("./Batch");
const Payment = require("./Payment");
const Membership = require("./Membership");

// ✅ Define Relationships
User.hasMany(Payment, { foreignKey: "user_id" });
Payment.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Membership, { foreignKey: "user_id" });
Membership.belongsTo(User, { foreignKey: "user_id" });

Batch.hasMany(Membership, { foreignKey: "batch_id" });
Membership.belongsTo(Batch, { foreignKey: "batch_id" });

Payment.hasOne(Membership, { foreignKey: "payment_id" });
Membership.belongsTo(Payment, { foreignKey: "payment_id" });

const syncDatabase = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully.");

    await sequelize.sync({ alter: true });
    console.log("✅ All models synchronized.");
  } catch (error) {
    console.error("❌ Database sync failed:", error);
  }
};

module.exports = { User, Batch, Payment, Membership, syncDatabase };
