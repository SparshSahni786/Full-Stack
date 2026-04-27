# Experiment 10 - CRUD Operations using Node.js + Express.js + MongoDB

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure
```
experiment10/
├── server.js
├── models/
│   └── Student.js
├── routes/
│   └── studentRoutes.js
├── package.json
└── README.md
```

## How to Run

### Step 1: Install MongoDB
Make sure MongoDB is installed and running on your system.
- Download: https://www.mongodb.com/try/download/community
- Start MongoDB service: `mongod`

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the Server
```bash
npm run dev
```
Server runs on: http://localhost:5000

---

## API Endpoints (Test in Postman)

### Create Student
- **Method:** POST
- **URL:** `http://localhost:5000/api/students`
- **Body (JSON):**
```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "course": "BCA"
}
```

### Get All Students
- **Method:** GET
- **URL:** `http://localhost:5000/api/students`

### Get Single Student
- **Method:** GET
- **URL:** `http://localhost:5000/api/students/:id`

### Update Student
- **Method:** PUT
- **URL:** `http://localhost:5000/api/students/:id`
- **Body (JSON):**
```json
{
  "name": "Rahul Kumar",
  "course": "MCA"
}
```

### Delete Student
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/students/:id`
