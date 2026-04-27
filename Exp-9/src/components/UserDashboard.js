import React, { useState, useEffect } from "react";
import axios from "axios";

function UserDashboard() {
  const role = sessionStorage.getItem("role");
  const username = sessionStorage.getItem("user");
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!role) {
      window.location.href = "/";
    }
  }, [role]);

  const fetchData = async () => {
    setError("");
    try {
      const pass = sessionStorage.getItem("pass");
      const res = await axios.get("http://localhost:8080/api/user/profile", {
        auth: { username, password: pass }
      });
      setProfileData(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Error fetching user data: " + (err.message || "Unknown error"));
      }
    }
  };

  const tryAdminAccess = async () => {
    setError("");
    try {
      const pass = sessionStorage.getItem("pass");
      await axios.get("http://localhost:8080/api/admin/dashboard", {
        auth: { username, password: pass }
      });
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError("⛔ Access Denied! You do not have ADMIN privileges.");
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
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">👤 User Dashboard</h4>
          <button className="btn btn-light btn-sm" onClick={logout}>Logout</button>
        </div>
        <div className="card-body">
          <p>Welcome, <strong>{username}</strong>! Role: <span className="badge bg-success">{role}</span></p>

          {error && <div className="alert alert-danger">{error}</div>}

          {profileData && (
            <div className="alert alert-info">
              <strong>Profile Data:</strong><br />
              Message: {profileData.message}<br />
              Username: {profileData.username}
            </div>
          )}

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-success" onClick={fetchData}>
              ✅ Get My Profile
            </button>
            <button className="btn btn-outline-danger" onClick={tryAdminAccess}>
              🚫 Try Admin Access (Unauthorized)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
