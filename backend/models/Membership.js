const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./User");
const Batch = require("./Batch");
const Payment = require("./Payment");

const Membership = sequelize.define("Membership", {
  membership_id: {
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
  batch_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Batch,
      key: "batch_id",
    },
  },
  payment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Payment,
      key: "payment_id",
    },
  },
  expiry_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// ✅ Relationships
Membership.belongsTo(User, { foreignKey: "user_id" });
Membership.belongsTo(Batch, { foreignKey: "batch_id" });
Membership.belongsTo(Payment, { foreignKey: "payment_id" });

module.exports = Membership;
