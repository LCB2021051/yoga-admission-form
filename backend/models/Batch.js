const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Batch = sequelize.define("Batch", {
  batch_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  timing: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Batch;
