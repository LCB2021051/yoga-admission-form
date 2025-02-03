const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./User");

const Payment = sequelize.define("Payment", {
  payment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 500.0,
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Completed"),
    defaultValue: "Pending",
  },
});

// ✅ Relationships
Payment.belongsTo(User, { foreignKey: "user_id" });

module.exports = Payment;
