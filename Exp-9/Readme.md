Experiment 9 – Frontend Integration with RBAC (React + Session-Based UI)
📌 Overview

This project is part of Experiment 9, where a React frontend is developed to interact with a Spring Boot backend implementing Role-Based Access Control (RBAC). The application allows users to log in and access features based on their assigned roles.

🎯 Objectives
Build a responsive frontend using React
Integrate frontend with RBAC backend APIs
Implement session-based authentication
Restrict UI access based on user roles
Understand role-based authorization in real-world apps
🛠️ Technologies Used
Frontend
React.js
JavaScript (ES6+)
HTML5, CSS3
UI & Styling
Bootstrap
Material UI
Backend
Spring Boot (from previous experiment)
REST APIs
Tools
Axios (API calls)
Git & GitHub
VS Code
⚙️ Key Features
🔐 Secure Login System
🧑‍💼 Role-Based Access (Admin/User)
🔄 Session Management using Cookies
🚫 Protected Routes (Unauthorized access blocked)
📊 Dashboard with dynamic content
🔓 Logout functionality
📂 Project Structure
project-root/
│
├── public/
│
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Login, Dashboard, Admin/User pages
│   ├── services/        # API calls (Axios)
│   ├── utils/           # Helper functions
│   ├── App.js           # Main component
│   └── index.js         # Entry point
│
├── package.json
└── README.md
🔄 Application Flow
User opens the application
Login page is displayed
User enters credentials
Request sent to backend API
Backend validates and creates session
Role is returned (Admin/User)
User is redirected to dashboard
UI changes based on role permissions
🔐 Authentication & Authorization
Authentication
Implemented using session-based login
Backend sets session cookie after successful login
Axios sends requests with withCredentials: true
Authorization
UI components rendered based on role
Admin routes are protected
Unauthorized users cannot access restricted pages
🔌 API Endpoints Used
Method	Endpoint	Description
POST	/login	Authenticate user
POST	/logout	Logout user
GET	/admin/data	Admin-only data
GET	/user/data	User-specific data
🚀 Setup Instructions
1️⃣ Clone the Repository
git clone <repository-url>
cd <project-folder>
2️⃣ Install Dependencies
npm install
3️⃣ Start the Frontend
npm start
4️⃣ Start Backend

Make sure your Spring Boot backend is running on:

http://localhost:8080
⚠️ Important Configuration
Enable CORS in Backend

Ensure backend allows frontend requests:

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
Axios Configuration
axios.defaults.withCredentials = true;
🖥️ UI Pages
Login Page
Dashboard
Admin Panel
User Panel
Error / Unauthorized Page
🧪 Testing Scenarios
Valid login (Admin/User)
Invalid credentials
Access admin page as user (should fail)
Session persistence after refresh
Logout and re-login
📊 Expected Output
Successful login redirects to dashboard
Admin sees admin features
User sees limited features
Unauthorized access is blocked
🐞 Common Issues & Fixes
Issue	Solution
Invalid Credentials	Check backend API & database
CORS Error	Enable CORS in backend
Session not working	Enable withCredentials in Axios
Unauthorized access	Check role handling
📌 Learning Outcomes
Understanding of RBAC implementation
Hands-on experience with React + Spring Boot integration
Session-based authentication handling
Real-world frontend-backend communication
🔮 Future Enhancements
JWT-based authentication
Role management UI
Persistent login (Remember me)
Improved UI/UX design
📎 Conclusion

This experiment demonstrates how a frontend application can securely interact with a backend system using role-based authorization. It highlights the importance of authentication, session handling, and UI-level access control.