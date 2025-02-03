const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database"); // ✅ Import DB connection function
const { syncDatabase } = require("./models");

// ✅ Import API Routes
const userRoutes = require("./routes/userRoutes");
const batchRoutes = require("./routes/batchRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");
const membershipRoutes = require("./routes/membershipRoutes");

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ Connect to Database First
connectDB()
  .then(() => {
    // ✅ Sync Database Models
    syncDatabase();

    // ✅ API Routes
    app.use("/api/users", userRoutes);
    app.use("/api/batches", batchRoutes);
    app.use("/api/payments", paymentRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/membership", membershipRoutes);

    // ✅ Start Server
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err.message);
  });
