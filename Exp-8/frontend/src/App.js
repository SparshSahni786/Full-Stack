import React from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const path = window.location.pathname;

  if (path === "/dashboard") {
    return <Dashboard />;
  }
  return <Login />;
}

export default App;
