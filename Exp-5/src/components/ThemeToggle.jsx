// src/components/ThemeToggle.jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

export default function ThemeToggle() {
  const { state, toggleTheme } = useContext(AppContext);

  return (
    <button className="btn btn-ghost" onClick={toggleTheme}>
      {state.theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
