import React, { useState } from "react";
import axios from "axios";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
  },
  badge: {
    display: "inline-block",
    background: "rgba(99,102,241,0.2)",
    border: "1px solid rgba(99,102,241,0.4)",
    color: "#a5b4fc",
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    letterSpacing: "2px",
    padding: "4px 12px",
    borderRadius: "20px",
    marginBottom: "16px",
    textTransform: "uppercase",
  },
  title: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  subtitle: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "14px",
    marginBottom: "32px",
  },
  label: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "12px",
    fontFamily: "'Space Mono', monospace",
    letterSpacing: "1px",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#ffffff",
    fontSize: "15px",
    marginBottom: "20px",
    outline: "none",
    transition: "border 0.2s",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.5px",
    transition: "opacity 0.2s, transform 0.1s",
    marginTop: "4px",
  },
  error: {
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#fca5a5",
    fontSize: "13px",
    marginBottom: "16px",
  },
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>🔐 JWT Auth</div>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to access your dashboard</p>

        {error && <div style={styles.error}>⚠ {error}</div>}

        <label style={styles.label}>USERNAME</label>
        <input
          style={styles.input}
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <label style={styles.label}>PASSWORD</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
          onClick={login}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In →"}
        </button>

        <p
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "12px",
            textAlign: "center",
            marginTop: "24px",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          Token stored in sessionStorage
        </p>
      </div>
    </div>
  );
}

export default Login;
