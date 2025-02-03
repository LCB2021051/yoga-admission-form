# 🧘 Yoga Admission Form

A **full-stack web application** for managing yoga class registrations, membership tracking, and payment processing.

## 🌟 Features

### 🔹 **User Authentication**

- **OTP-based login** (via phone number)
- Automatic **user registration** if not found
- Secure **JWT authentication**

### 🔹 **Batch Management**

- View available **batches**
- Register for a batch
- Admin can **add/delete batches** (if needed)

### 🔹 **Membership Management**

- Active membership is **displayed prominently**
- View **previous memberships**
- Users can **register for a new membership** if expired

### 🔹 **Payments**

- Integrated **payment processing**
- Secure **payment validation**
- Automatic membership activation after payment

### 🔹 **Responsive UI**

- **2x2 grid layout** for batches
- **Split view** for desktop (Batches & Membership Info)
- **Mobile-friendly navbar** to switch between views

---

## 🛠️ Tech Stack

### 🖥️ **Frontend**

- **React.js** (UI development)
- **React Router** (Navigation)
- **Axios** (API calls)

### 🌐 **Backend**

- **Node.js & Express.js** (API & authentication)
- **Sequelize ORM** (Database interaction)
- **MySQL** (Relational database)
- **JWT Authentication** (User authentication)
- **Speakeasy** (OTP generation & verification)

### ☁️ **Deployment**

- **Frontend:** Vercel / Netlify
- **Backend:** Railway / Render
- **Database:** MySQL on Railway / Planetscale

---

## 🚀 Getting Started

### 🔹 **1. Clone the Repository**

```sh
git clone https://github.com/yourusername/yoga-admission-form.git
cd yoga-admission-form
```

### 🔹 **2. Setup Backend**

```sh
cd backend
npm install
```

- **Configure `.env` file**:

  ```env
  MYSQL_HOST=localhost
  MYSQL_USER=root
  MYSQL_PASSWORD=yourpassword
  MYSQL_DB=yoga_db
  JWT_SECRET=your_secret_key
  OTP_SECRET=your_otp_secret
  ```

- **Run Backend**
  ```sh
  npm run dev
  ```

### 🔹 **3. Setup Frontend**

```sh
cd ../frontend
npm install
```

- **Run Frontend**
  ```sh
  npm start
  ```

---

## 🔗 API Endpoints

### 🔹 **Authentication**

| Endpoint               | Method | Description              |
| ---------------------- | ------ | ------------------------ |
| `/api/auth/send-otp`   | POST   | Send OTP to phone number |
| `/api/auth/verify-otp` | POST   | Verify OTP and login     |

### 🔹 **User & Membership**

| Endpoint                   | Method | Description                   |
| -------------------------- | ------ | ----------------------------- |
| `/api/users/register`      | POST   | Register a new user           |
| `/api/membership/:user_id` | GET    | Get user's membership details |
| `/api/membership`          | POST   | Add a new membership          |

### 🔹 **Batches & Payments**

| Endpoint            | Method | Description               |
| ------------------- | ------ | ------------------------- |
| `/api/batches/all`  | GET    | Get all available batches |
| `/api/payments/pay` | POST   | Process a payment         |

---

## 🎯 Deployment Guide

### **Frontend Deployment**

1. **Build the React App**
   ```sh
   npm run build
   ```
2. **Deploy to Vercel / Netlify**
   - **Vercel**: `vercel deploy`
   - **Netlify**: `netlify deploy`

### **Backend Deployment**

1. **Deploy to Railway / Render**

   - **Railway**: Connect repository → Add `.env` variables → Deploy
   - **Render**: Add Node.js service → Set environment variables → Deploy

2. **Database Setup**
   - Use **Railway MySQL** or **Planetscale**
   - **Migrate database** using Sequelize:
     ```sh
     npm run migrate
     ```

---

## 👥 Contributors

- **VivekKorah(https://github.com/yourusername)** – Developer

---

## 📜 License

This project is **MIT Licensed**. Feel free to use and modify. 🎉
