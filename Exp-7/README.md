# Experiment 7 - Role-Based Authorization (RBAC) with Spring Boot

**Name:** Akshat
**UID:** 23BAI70667

---
## Project Overview
This project demonstrates Role-Based Access Control (RBAC) using Spring Boot and Spring Security with HTTP Basic Authentication.

---

## Tech Stack
- Java 17
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- H2 In-Memory Database
- Lombok
- Maven

---

## Project Structure
```
src/
├── main/
│   ├── java/com/example/experiment7/
│   │   ├── config/
│   │   │   └── SecurityConfig.java        ← Security rules & role config
│   │   ├── controller/
│   │   │   ├── AuthController.java        ← Login endpoint
│   │   │   ├── PublicController.java      ← Public endpoints
│   │   │   ├── UserController.java        ← USER/ADMIN endpoints
│   │   │   └── AdminController.java       ← ADMIN only endpoints
│   │   ├── dto/
│   │   │   ├── LoginRequest.java
│   │   │   └── LoginResponse.java
│   │   ├── entity/
│   │   │   └── User.java
│   │   ├── repository/
│   │   │   └── UserRepository.java
│   │   ├── service/
│   │   │   ├── CustomUserDetailsService.java
│   │   │   └── AuthService.java
│   │   └── Experiment7Application.java
│   └── resources/
│       ├── application.properties
│       └── data.sql                       ← Pre-loaded users
└── test/
screenshots/
```

---

## How to Run

### Prerequisites
- Java 17+ installed
- Maven installed (or use `./mvnw`)

### Steps
```bash
# 1. Navigate to project folder
cd experiment7

# 2. Build & run
mvn spring-boot:run

# OR using Maven wrapper
./mvnw spring-boot:run
```

Server starts at: `http://localhost:8080`

---

## Default Users

| Username | Password | Role       |
|----------|----------|------------|
| user1    | user123  | ROLE_USER  |
| admin1   | admin123 | ROLE_ADMIN |

---

## API Endpoints

| Method | URL                         | Access         | Description                    |
|--------|-----------------------------|----------------|--------------------------------|
| GET    | /api/public/hello           | Public         | No auth needed                 |
| GET    | /api/public/status          | Public         | Server status                  |
| POST   | /api/auth/login             | Public         | Login and verify credentials   |
| GET    | /api/user/profile           | USER, ADMIN    | Get user profile               |
| GET    | /api/user/dashboard         | USER, ADMIN    | User dashboard                 |
| GET    | /api/admin/dashboard        | ADMIN only     | Admin dashboard                |
| GET    | /api/admin/users            | ADMIN only     | List all users                 |
| GET    | /h2-console                 | Public         | H2 Database Console            |

---

## Testing with Postman

### Method 1: HTTP Basic Auth (Recommended)

1. Open Postman
2. Create new request
3. Go to **Authorization** tab
4. Select **Basic Auth**
5. Enter username & password
6. Send the request

### Test Cases

#### ✅ Test 1: Public Endpoint (No Auth)
- **Method:** GET
- **URL:** `http://localhost:8080/api/public/hello`
- **Auth:** None
- **Expected:** 200 OK

#### ✅ Test 2: Login Endpoint
- **Method:** POST
- **URL:** `http://localhost:8080/api/auth/login`
- **Body (JSON):**
```json
{
  "username": "user1",
  "password": "user123"
}
```
- **Expected:** 200 OK with user info

#### ✅ Test 3: USER accessing /api/user/profile
- **Method:** GET
- **URL:** `http://localhost:8080/api/user/profile`
- **Auth:** Basic Auth → user1 / user123
- **Expected:** 200 OK

#### ❌ Test 4: USER accessing /api/admin/dashboard (Should Fail)
- **Method:** GET
- **URL:** `http://localhost:8080/api/admin/dashboard`
- **Auth:** Basic Auth → user1 / user123
- **Expected:** **403 Forbidden**

#### ✅ Test 5: ADMIN accessing /api/admin/dashboard
- **Method:** GET
- **URL:** `http://localhost:8080/api/admin/dashboard`
- **Auth:** Basic Auth → admin1 / admin123
- **Expected:** 200 OK

#### ❌ Test 6: No Auth (Should Fail)
- **Method:** GET
- **URL:** `http://localhost:8080/api/user/profile`
- **Auth:** None
- **Expected:** **401 Unauthorized**

#### ❌ Test 7: Invalid Credentials
- **Method:** POST
- **URL:** `http://localhost:8080/api/auth/login`
- **Body:**
```json
{
  "username": "user1",
  "password": "wrongpassword"
}
```
- **Expected:** 401 with error message

---

## H2 Database Console
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:rbacdb`
- Username: `sa`
- Password: (leave empty)

---

## HTTP Status Codes
| Code | Meaning    | When                                  |
|------|------------|---------------------------------------|
| 200  | OK         | Request successful                    |
| 401  | Unauthorized | No credentials or wrong credentials |
| 403  | Forbidden  | Valid credentials but wrong role      |
