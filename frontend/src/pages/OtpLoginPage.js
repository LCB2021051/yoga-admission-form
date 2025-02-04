import React from "react";
import OtpLogin from "../components/OtpLogin.js";

const OtpLoginPage = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.title}>YOGA PLACE</h1>
        <p style={styles.subtitle}>
          Please enter your phone number to receive an OTP.
        </p>
        <OtpLogin />
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "transparent",
  },
  container: {
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    padding: "30px",
    border: "transparent",
    borderRadius: "12px",
    background: "transparent",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
  },
};

export default OtpLoginPage;
