# 🚀 Experiment 5 – Advanced React Dashboard (Extension of Experiment 4)

## 👨‍💻 Student Details
**Name:** Akshat  
**UID:** 23BAI70667  
**Course:** Full Stack Development  
**Experiment:** Experiment 5 (Extension of Experiment 4)


## 📌 Project Overview
This project is an **extension of Experiment 4** where advanced React concepts were implemented to build a scalable multi-page application.

The application demonstrates:

- Structured state management using **Redux Toolkit**
- Global state handling using **React Context API**
- Performance optimization using **useMemo**
- Multi-page navigation using **React Router**
- Smart Assistant system similar to Copilot
- Persistent application state

---

## 🎯 Experiment 5 Objectives
- Implement Redux Toolkit for centralized state management
- Use Context API for global application settings
- Optimize computations using useMemo
- Extend an existing React application
- Maintain consistent UI/UX across pages

---

## 🧩 Implemented Features

### ✅ React Router
Application includes multiple working routes:

- Home
- Events
- Pricing
- Contact
- Event Details
- Register
- RSVP
- Analytics
- Settings
- Tasks
- Reports
- Assistant ⭐ (New)
- Activity Feed ⭐ (New)

Navigation works through Navbar links.

---

### ✅ Context API (Global State)
`AppContext` manages global application data:

- Light / Dark Theme
- Mock User Profile
- Theme Toggle across application

Used in multiple components:
- Navbar
- Assistant
- Settings Page

---

### ✅ Redux Toolkit (State Management)

Redux store configured using:

Main Redux Features:

#### Tasks Management
- Add Task
- Toggle Task
- Delete Task
- Clear Completed Tasks

#### Application Settings
- Compact Mode Toggle
- Notifications Toggle
- RSVP Status

#### Assistant Chat State
- Chat messages stored globally
- Smart command execution

#### Activity Feed
Tracks all user actions automatically.

---

### ✅ Smart AI Assistant (Advanced Feature)
A Copilot-style assistant is implemented.

Features:
- Floating assistant button
- Slide panel interface
- FAQ quick buttons
- Auto suggestions
- Command execution
- Live Redux data responses

Supported Commands:
add task: Learn Redux priority high
toggle compact
toggle notifications
theme dark
theme light
clear completed
show stats
rsvp yes


Assistant can also answer queries related to:
- Redux Toolkit
- Context API
- useMemo
- Routing
- Deployment

---

### ✅ useMemo Optimization
Used for performance improvements:

- Task statistics calculation
- Filtering and searching tasks
- Reports analytics
- Assistant suggestions
- Derived Redux data

Recomputes only when dependencies change.

---

### ✅ Activity Feed (New Page)
Displays timeline of actions:

- Task updates
- Theme changes
- Assistant commands
- Settings modifications

Implemented using Redux global state.

---

### ✅ Persistent State (LocalStorage)
Redux state automatically saves:

- Tasks
- Assistant Chat
- Settings
- Activity Logs

Data remains after refresh.

---

## 🎨 UI & Design
- Modern dashboard layout
- Responsive design
- Dark / Light theme
- Smooth transitions
- Floating Assistant (Copilot style)
- Clean spacing and typography

Works on:
- Desktop ✅
- Mobile ✅

---

## 📁 Folder Structure


Assistant can also answer queries related to:
- Redux Toolkit
- Context API
- useMemo
- Routing
- Deployment

---

### ✅ useMemo Optimization
Used for performance improvements:

- Task statistics calculation
- Filtering and searching tasks
- Reports analytics
- Assistant suggestions
- Derived Redux data

Recomputes only when dependencies change.

---

### ✅ Activity Feed (New Page)
Displays timeline of actions:

- Task updates
- Theme changes
- Assistant commands
- Settings modifications

Implemented using Redux global state.

---

### ✅ Persistent State (LocalStorage)
Redux state automatically saves:

- Tasks
- Assistant Chat
- Settings
- Activity Logs

Data remains after refresh.

---

## 🎨 UI & Design
- Modern dashboard layout
- Responsive design
- Dark / Light theme
- Smooth transitions
- Floating Assistant (Copilot style)
- Clean spacing and typography

Works on:
- Desktop ✅
- Mobile ✅

---

## 📁 Folder Structure
src/
│
├── components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ ├── Layout.jsx
│ ├── AssistantWidget.jsx
│
├── context/
│ └── AppContext.jsx
│
├── redux/
│ ├── store.js
│ └── slices/
│ └── appSlice.js
│
├── pages/
│ ├── Home.jsx
│ ├── Events.jsx
│ ├── Pricing.jsx
│ ├── Contact.jsx
│ ├── Analytics.jsx
│ ├── Settings.jsx
│ ├── Tasks.jsx
│ ├── Reports.jsx
│ ├── Assistant.jsx
│ └── Activity.jsx
│
├── App.jsx
├── main.jsx
└── index.css

✅ Experiment 5 Checklist

✔ App runs without errors

✔ React Router (3+ pages)

✔ Added new page

✔ Context API used

✔ Redux Toolkit implemented

✔ Minimum 3 Redux actions

✔ Redux used in multiple components

✔ useMemo optimization added

✔ Responsive UI maintained

✔ README updated

✔ Screenshots added

✔ Deployed on Vercel

✔ node_modules excluded

🏁 Conclusion

This experiment demonstrates scalable React application architecture using modern best practices including Redux Toolkit, Context API, performance optimization techniques, and intelligent UI interaction through a smart assistant system.