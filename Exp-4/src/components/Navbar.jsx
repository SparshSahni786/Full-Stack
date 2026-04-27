import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

export default function Navbar() {
  const { state, toggleTheme } = useContext(AppContext);

  const navItems = [
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
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <button className="theme-btn" onClick={toggleTheme}>
          {state.theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </header>
  );
}
