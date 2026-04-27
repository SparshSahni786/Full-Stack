# JWT Authentication Backend using Spring Boot

**Name:** Akshat
**UID:** 23BAI70667

---

# 📌 Project Overview

This project demonstrates **JWT (JSON Web Token) Authentication** implemented in a **Spring Boot backend application**. The system allows users to register, login, access protected routes using a JWT token, and logout by invalidating the token.

The main objective of this project is to understand **secure authentication, token-based session management, and API testing using Postman**.

---

# 🎯 Objectives

* Implement **JWT-based authentication** in a Spring Boot backend.
* Authenticate users using **username and password**.
* Generate **JWT tokens for authenticated sessions**.
* Protect API routes using token verification.
* Demonstrate authentication flow using **Postman requests**.

---

# 🛠 Technologies Used

* **Java 17**
* **Spring Boot**
* **Spring Security**
* **Spring Data JPA**
* **JWT (JJSON Web Token Library)**
* **H2 In-Memory Database**
* **Maven**
* **Postman (API Testing)**

---

# 📁 Project Structure

```
jwt-auth/
│
├── src/main/java/com/example/jwtauth/
│   │
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   └── JwtAuthenticationFilter.java
│   │
│   ├── controller/
│   │   ├── AuthController.java
│   │   └── TestController.java
│   │
│   ├── dto/
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   └── AuthResponse.java
│   │
│   ├── entity/
│   │   ├── User.java
│   │   └── BlacklistedToken.java
│   │
│   ├── repository/
│   │   ├── UserRepository.java
│   │   └── BlacklistedTokenRepository.java
│   │
│   ├── security/
│   │   ├── CustomUserDetailsService.java
│   │   └── JwtService.java
│   │
│   ├── service/
│   │   └── AuthService.java
│   │
│   └── JwtAuthApplication.java
│
├── src/main/resources/
│   └── application.properties
│
├── screenshots/
│   ├── login-success.png
│   ├── protected-route.png
│   └── logout-token-invalid.png
│
├── pom.xml
└── README.md
```

---

# 🔐 Authentication Flow

The authentication process follows these steps:

### 1️⃣ User Registration

A new user registers using a username and password.

```
POST /api/auth/register
```

Example Request:

```json
{
  "username": "akshat",
  "password": "1234"
}
```

Response:

```
User registered successfully
```

---

### 2️⃣ User Login

The user logs in using their credentials. If authentication is successful, a **JWT token is generated and returned**.

```
POST /api/auth/login
```

Request Body:

```json
{
  "username": "akshat",
  "password": "1234"
}
```

Example Response:

```json
{
  "token": "jwt_token_here",
  "message": "Login successful"
}
```

---

### 3️⃣ Access Protected Route

To access protected routes, the client must send the JWT token in the **Authorization header**.

```
GET /api/test/protected
```

Header:

```
Authorization: Bearer <jwt_token>
```

Response:

```
This is a protected route. JWT token is valid.
```

---

### 4️⃣ Logout (Token Invalidation)

When the user logs out, the JWT token is **added to a blacklist**, preventing further use.

```
POST /api/auth/logout
```

Header:

```
Authorization: Bearer <jwt_token>
```

Response:

```
Logged out successfully. Token invalidated.
```

---

# 🧪 Postman Testing

The authentication process was tested using **Postman**.

The following screenshots demonstrate the functionality:

### 1️⃣ Successful Login and JWT Token Generation

* Login request sent with username and password.
* JWT token received in response.

### 2️⃣ Access Protected Route

* Protected API accessed using JWT token in Authorization header.

### 3️⃣ Logout and Token Invalidation

* Logout request invalidates the token.
* The same token can no longer access protected routes.

Screenshots are included in the **screenshots/** folder.

---

# ▶️ How to Run the Project

### 1. Clone the repository

```
git clone <repository_url>
```

### 2. Navigate to the project directory

```
cd jwt-auth
```

### 3. Install dependencies

```
mvn clean install
```

### 4. Run the Spring Boot application

```
mvn spring-boot:run
```

### 5. Access the API

```
http://localhost:8080
```

---

# 📊 Expected Output

| Feature                  | Result                   |
| ------------------------ | ------------------------ |
| User Registration        | Successful               |
| User Login               | JWT Token Generated      |
| Protected Route Access   | Allowed with Valid Token |
| Logout                   | Token Invalidated        |
| Token Reuse After Logout | Access Denied            |

---

# 🔑 Key Concepts Learned

* JSON Web Token (JWT) Authentication
* Spring Security Configuration
* Token-based Session Management
* Secure API Development
* API Testing using Postman
* Backend Authentication Flow

---

# 📌 Conclusion

This project successfully demonstrates **JWT-based authentication using Spring Boot**. It shows how token-based authentication can securely manage user sessions and protect API endpoints.

JWT authentication improves scalability because it eliminates the need for server-side session storage while ensuring secure communication between the client and server.

---
