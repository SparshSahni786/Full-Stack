import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

export default function Navbar() {
  const { state, toggleTheme } = useContext(AppContext);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "Event Details", path: "/event-details" },
    { name: "Register", path: "/register" },
    { name: "RSVP", path: "/rsvp" },
    { name: "Analytics", path: "/analytics" },
    { name: "Settings", path: "/settings" },
    { name: "Tasks", path: "/tasks" },
    { name: "Reports", path: "/reports" },
    { name: "Assistant", path: "/assistant" },
    { name: "Activity", path: "/activity" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="logo">
          Chandigarh University | <span>TechFest 2026</span>
        </div>

        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="user-chip" title="Mock user from Context">
            <span className="user-dot" />
            <span className="user-name">{state.user?.name || "User"}</span>
            <span className="user-role">{state.user?.role || "Member"}</span>
          </div>

          <button className="theme-btn" onClick={toggleTheme} title="Toggle Theme">
            {state.theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </header>
  );
}