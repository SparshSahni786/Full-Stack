import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const role = sessionStorage.getItem("role");
  const username = sessionStorage.getItem("user");
  const [dashData, setDashData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!role) {
      window.location.href = "/";
      return;
    }
    if (role !== "ADMIN") {
      alert("Access Denied! Admins only.");
      window.location.href = "/";
    }
  }, [role]);

  const fetchAdmin = async () => {
    setError("");
    try {
      const pass = sessionStorage.getItem("pass");
      const res = await axios.get("http://localhost:8080/api/admin/dashboard", {
        auth: { username, password: pass }
      });
      setDashData(res.data);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError("⛔ Access Denied!");
      } else {
        setError("Error: " + err.message);
      }
    }
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">🛡️ Admin Dashboard</h4>
          <button className="btn btn-light btn-sm" onClick={logout}>Logout</button>
        </div>
        <div className="card-body">
          <p>Welcome, <strong>{username}</strong>! Role: <span className="badge bg-danger">{role}</span></p>

          {error && <div className="alert alert-danger">{error}</div>}

          {dashData && (
            <div className="alert alert-warning">
              <strong>Admin Data:</strong><br />
              Message: {dashData.message}<br />
              Username: {dashData.username}<br />
              Info: {dashData.info}
            </div>
          )}

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-danger" onClick={fetchAdmin}>
              🔑 Get Admin Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
