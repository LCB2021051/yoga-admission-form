const { Sequelize } = require("sequelize");
require("dotenv").config();

// ✅ Check if environment variables are correctly set
if (
  !process.env.MYSQL_DB ||
  !process.env.MYSQL_USER ||
  !process.env.MYSQL_PASSWORD ||
  !process.env.MYSQL_HOST
) {
  console.error(
    "❌ Missing database environment variables. Check your .env file."
  );
  process.exit(1);
}

// ✅ Initialize Sequelize
const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true, // Ensures createdAt & updatedAt fields
    },
  }
);

// ✅ Function to connect to the database
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Database Connected Successfully.");
  } catch (error) {
    console.error("❌ MySQL Connection Failed:", error.message);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
