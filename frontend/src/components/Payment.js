import React, { useState } from "react";
import { makePayment } from "../services/api"; // ✅ Import API function

const Payment = ({ amount, user_id, onPaymentSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // ✅ Call API to process payment
      const response = await makePayment(user_id, amount);

      if (response.status === 201) {
        alert("✅ Payment successful!");
        onPaymentSuccess(response.data.payment.payment_id); // ✅ Callback with `payment_id`
      } else {
        throw new Error(response.data.message || "❌ Payment failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "❌ Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.modal}>
      <div style={styles.box}>
        <h2 style={styles.title}>Complete Your Payment 💳</h2>
        <p style={styles.amount}>
          Amount: <strong>₹{amount}</strong>
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.buttonContainer}>
          <button
            onClick={handlePayment}
            disabled={loading}
            style={styles.payBtn}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            style={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Improved Styling
const styles = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  box: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
    width: "350px",
    maxWidth: "90%",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  amount: {
    fontSize: "18px",
    color: "#444",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  payBtn: {
    background: "#28a745",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
  },
  cancelBtn: {
    background: "#dc3545",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default Payment;
