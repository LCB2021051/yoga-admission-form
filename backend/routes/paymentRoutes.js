const express = require("express");
const {
  processPayment,
  getAllPayments,
  getPaymentById,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/pay", processPayment);
router.get("/all", getAllPayments);
router.get("/:payment_id", getPaymentById);

module.exports = router;
