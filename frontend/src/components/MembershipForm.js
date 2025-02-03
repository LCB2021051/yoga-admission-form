import React, { useState, useEffect } from "react";
import { getBatches, addMembership } from "../services/api";
import Payment from "./Payment"; // ✅ Import Payment Component

const MembershipForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [batch_id, setBatchId] = useState("");
  const [batches, setBatches] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [user_id, setUserId] = useState(null);

  useEffect(() => {
    getBatches().then((response) => setBatches(response.data));

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserId(userData.user_id);
      setName(userData.name || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!batch_id) {
      alert("❌ Please select a batch!");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (payment_id) => {
    setShowPayment(false);
    try {
      await addMembership(
        user_id,
        batch_id,
        payment_id,
        new Date().toISOString()
      );
      alert("✅ Membership registered successfully!");
      onSuccess();
    } catch (error) {
      alert("❌ Membership registration failed.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🌟 Monthly Membership 🌟</h2>

      {/* ✅ Display User's Name Without Input Box */}
      <p style={styles.name}>{name}</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* ✅ Batch Selection Dropdown */}
        <select
          value={batch_id}
          onChange={(e) => setBatchId(e.target.value)}
          required
          style={styles.select}
        >
          <option value="" style={styles.option}>
            Select a Batch
          </option>
          {batches.map((b) => (
            <option key={b.batch_id} value={b.batch_id} style={styles.option}>
              {b.timing}
            </option>
          ))}
        </select>

        {/* ✅ Visible Button */}
        <button type="submit" style={styles.button}>
          Get Membership
        </button>
      </form>

      {/* ✅ Payment Component */}
      {showPayment && (
        <Payment
          amount={500}
          user_id={user_id}
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={() => setShowPayment(false)}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "15px",
    textAlign: "center",
    backgroundImage:
      "url('https://img.pikbest.com/wp/202343/texture-sparkle-sparkling-golden-glitter-the-perfect-background-for-christmas_9970146.jpg!w700wp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.8)",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
    marginBottom: "15px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "black",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "10px 20px",
    borderRadius: "8px",
    textAlign: "center",
    width: "100%",
    maxWidth: "80%",
    marginBottom: "10px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
  },
  select: {
    width: "85%",
    padding: "12px",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    cursor: "pointer",
    appearance: "none", // ✅ Hide default dropdown arrow
  },
  option: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // ✅ Transparent Options
    color: "black",
    fontSize: "16px",
  },
  button: {
    background: "#FFD700", // ✅ Gold button
    color: "black",
    fontWeight: "bold",
    padding: "12px 15px",
    border: "2px solid rgba(255, 215, 0, 0.8)", // ✅ Subtle Gold Border
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    marginTop: "10px",
  },
};

export default MembershipForm;
