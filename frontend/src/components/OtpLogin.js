import React, { useState } from "react";
import { requestOTP, verifyOTP, registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const OtpLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    setError("");
    try {
      await requestOTP(phone);
      setStep(2);
    } catch (error) {
      setError(error.response?.data?.message || "❌ Error sending OTP.");
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    try {
      const response = await verifyOTP(phone, otp);

      if (response.status === 201) {
        setShowRegistration(true); // ✅ Show Registration if User Not Found
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert("✅ Login successful!");
        navigate("/home");
      }
    } catch (error) {
      setError(error.response?.data?.message || "❌ Invalid OTP.");
    }
  };

  const handleRegister = async () => {
    try {
      const userData = { name, phone_number: phone, age };
      const response = await registerUser(userData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("✅ Registration successful! Logging in...");
      setShowRegistration(false);
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.message || "❌ Registration failed.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login with OTP</h2>
      {error && <p style={styles.error}>{error}</p>}

      {/* ✅ OTP Input */}
      {step === 1 ? (
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={styles.input}
          />
          <button onClick={handleSendOTP} style={styles.button}>
            Send OTP
          </button>
        </div>
      ) : (
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={styles.input}
          />
          <button onClick={handleVerifyOTP} style={styles.button}>
            Verify OTP
          </button>
        </div>
      )}

      {/* ✅ New User Registration Popup */}
      {showRegistration && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3 style={styles.popupTitle}>New User Registration</h3>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              style={styles.input}
            />
            <button onClick={handleRegister} style={styles.button}>
              Register
            </button>
            <button
              onClick={() => setShowRegistration(false)}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Enhanced Styling (Fixed Widths & Better UI)
const styles = {
  container: {
    maxWidth: "400px",
    height: "100%",
    margin: "auto",
    padding: "30px",
    textAlign: "center",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    textAlign: "center",
  },
  button: {
    background: "#28a745",
    color: "white",
    padding: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "6px",
    transition: "0.3s",
  },
  buttonHover: {
    background: "#218838",
  },
  cancelButton: {
    background: "#dc3545",
    color: "white",
    padding: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "6px",
    marginTop: "10px",
    transition: "0.3s",
  },
  overlay: {
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
  popup: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    width: "350px",
    maxWidth: "90%",
  },
  popupTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
};

export default OtpLogin;
