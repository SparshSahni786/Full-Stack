# 🔐 JWT Frontend – Experiment 8

**Name:** Akshat
**UID:** 23BAI70667

## 📌 Project Overview

This project is a **React-based frontend application** that integrates with a **JWT (JSON Web Token) authentication backend**. It demonstrates how modern web apps handle **secure login, session management, and protected routes** using token-based authentication.

The frontend communicates with backend APIs to:

* Authenticate users
* Store and manage JWT tokens
* Restrict access to protected pages
* Handle user sessions securely

---

## 🚀 Features

### 🔑 Authentication System

* Login form connected to backend (`POST /login`)
* Validates user credentials
* Stores JWT token in `sessionStorage`

### 🛡️ Protected Dashboard

* Access restricted to authenticated users only
* Fetches secure data using:

  ```
  GET /protected
  ```
* Sends token via Authorization header:

  ```
  Authorization: Bearer <token>
  ```

### 🔄 Session Management

* Token stored in `sessionStorage`
* Maintains login state across page refresh (until session ends)

### 🚪 Logout Functionality

* Clears stored token
* Redirects user back to login page
* Prevents unauthorized dashboard access

### ⚠️ Route Protection

* Prevents access to `/dashboard` without valid token
* Automatically redirects unauthenticated users

---

## 🧰 Tech Stack

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| React 18     | Frontend framework            |
| Axios        | API communication             |
| Bootstrap 5  | Styling & layout              |
| Material UI  | Modern UI components          |
| React Router | Navigation & protected routes |

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── Login.js
│   ├── Dashboard.js
│   └── Navbar.js
│
├── services/
│   └── api.js          # Axios configuration
│
├── App.js
├── index.js
└── styles.css
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```
git clone <your-repo-url>
cd jwt-frontend
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Start the Application

```
npm start
```

📍 App will run at:

```
http://localhost:3000
```

📊 Dashboard:

```
http://localhost:3000/dashboard
```

---

## 🔗 Backend Requirement

Make sure your backend server is running at:

```
http://localhost:5000
```

### Required API Endpoints:

#### 🔐 Login

```
POST /login
```

**Request Body:**

```json
{
  "username": "admin",
  "password": "1234"
}
```

**Response:**

```json
{
  "token": "your_jwt_token"
}
```

---

#### 🔒 Protected Route

```
GET /protected
```

**Headers:**

```
Authorization: Bearer <token>
```

---

## 🔄 How It Works

1. User enters credentials on Login page
2. Frontend sends request to backend
3. Backend validates and returns JWT token
4. Token stored in `sessionStorage`
5. Dashboard requests include token in headers
6. Backend verifies token before granting access

---

## 🧪 Testing Flow

* ✅ Try login with valid credentials → should redirect to dashboard
* ❌ Try accessing `/dashboard` without login → should redirect to login
* 🔁 Refresh dashboard → should remain logged in
* 🚪 Click logout → should clear session and redirect

---

## 📸 UI Highlights

* Clean login interface
* Responsive dashboard layout
* Styled with Bootstrap + Material UI
* User-friendly navigation

---

## ⚡ Future Improvements

* Add **Signup/Register functionality**
* Implement **refresh tokens**
* Add **role-based access control (RBAC)**
* Improve UI with animations
* Store token securely using **HTTP-only cookies**

---

