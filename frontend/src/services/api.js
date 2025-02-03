import axios from "axios";

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://yoga-admission-form-ic7d.onrender.com/";

// ✅ Fetch all batches
export const getBatches = async () => {
  try {
    return await axios.get(`${API_URL}/batches/all`);
  } catch (error) {
    console.error("❌ Error fetching batches:", error);
    throw error;
  }
};

// ✅ Register a new user
export const registerUser = async (userData) => {
  try {
    return await axios.post(`${API_URL}/users/register`, userData);
  } catch (error) {
    console.error("❌ Error registering user:", error);
    throw error;
  }
};

// ✅ Login User (Username/Password-based)
export const loginUser = async (credentials) => {
  try {
    return await axios.post(`${API_URL}/auth/login`, credentials);
  } catch (error) {
    console.error("❌ Error logging in:", error);
    throw error;
  }
};

// ✅ Make a payment
export const makePayment = async (user_id, amount) => {
  try {
    return await axios.post(`${API_URL}/payments/pay`, { user_id, amount });
  } catch (error) {
    console.error("❌ Error processing payment:", error);
    throw error;
  }
};

// ✅ Request OTP
export const requestOTP = async (phone_number) => {
  try {
    return await axios.post(`${API_URL}/auth/send-otp`, { phone_number });
  } catch (error) {
    console.error("❌ Error requesting OTP:", error);
    throw error;
  }
};

// ✅ Verify OTP and login
export const verifyOTP = async (phone_number, otp) => {
  try {
    return await axios.post(`${API_URL}/auth/verify-otp`, {
      phone_number,
      otp,
    });
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    throw error;
  }
};

// ✅ Get Memberships for a user
export const getMembership = async (user_id) => {
  try {
    return await axios.get(`${API_URL}/membership/${user_id}`);
  } catch (error) {
    console.error("❌ Error fetching memberships:", error);
    throw error;
  }
};

// ✅ Add a new Membership
export const addMembership = async (userId, batchId, paymentId, expiryDate) => {
  try {
    return await axios.post(`${API_URL}/membership/add`, {
      user_id: userId,
      batch_id: batchId,
      payment_id: paymentId,
      expiry_date: expiryDate,
    });
  } catch (error) {
    console.error("❌ Error adding membership:", error);
    throw error;
  }
};
