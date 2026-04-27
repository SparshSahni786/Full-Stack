import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Use Basic Auth to verify credentials against the backend
      const res = await axios.get("http://localhost:8080/api/user/profile", {
        auth: { username, password }
      });

      if (res.status === 200) {
        // Store credentials and role in sessionStorage
        sessionStorage.setItem("user", username);
        sessionStorage.setItem("pass", password);

        // Determine role: admin1 => ADMIN, user1 => USER
        const role = username.toLowerCase().includes("admin") ? "ADMIN" : "USER";
        sessionStorage.setItem("role", role);

        // Redirect based on role
        window.location.href = role === "ADMIN" ? "/admin" : "/user";
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid credentials. Try user1/123 or admin1/123");
      } else if (err.response && err.response.status === 403) {
        setError("Access denied.");
      } else {
        setError("Cannot connect to backend. Make sure Spring Boot is running on port 8080.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">🔐 RBAC Login</h4>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              placeholder="e.g. user1 or admin1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={login}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <hr />
          <small className="text-muted">
            <strong>Test Credentials:</strong><br />
            👤 user1 / 123 → User Dashboard<br />
            🛡️ admin1 / 123 → Admin Dashboard
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
