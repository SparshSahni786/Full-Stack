import React, { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    fontFamily: "'DM Sans', sans-serif",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "12px",
  },
  logo: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "600",
    fontFamily: "'Space Mono', monospace",
  },
  logoBadge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontSize: "11px",
    padding: "3px 10px",
    borderRadius: "20px",
    marginLeft: "10px",
    verticalAlign: "middle",
    letterSpacing: "1px",
  },
  logoutBtn: {
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "8px",
    padding: "8px 18px",
    color: "#fca5a5",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "32px",
    marginBottom: "24px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
  },
  cardTitle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    letterSpacing: "2px",
    marginBottom: "8px",
    textTransform: "uppercase",
  },
  cardValue: {
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "600",
    wordBreak: "break-all",
  },
  fetchBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: "10px",
    padding: "12px 28px",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "20px",
    display: "block",
  },
  responseBox: {
    background: "rgba(99,102,241,0.1)",
    border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "16px",
  },
  responseLabel: {
    color: "#a5b4fc",
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    letterSpacing: "2px",
    marginBottom: "8px",
  },
  responseText: {
    color: "#e0e7ff",
    fontSize: "15px",
    margin: 0,
  },
  tokenBox: {
    background: "rgba(0,0,0,0.3)",
    borderRadius: "10px",
    padding: "16px",
    fontFamily: "'Space Mono', monospace",
    fontSize: "11px",
    color: "#6ee7b7",
    wordBreak: "break-all",
    lineHeight: "1.8",
  },
  statusDot: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#34d399",
    marginRight: "8px",
    boxShadow: "0 0 8px #34d399",
  },
};

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  // 🔐 Unauthorized access with delay (for screenshot)
  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  }, [token]);

  const getData = async () => {
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await axios.get("http://localhost:5000/protected", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch protected data."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  const getTokenPreview = () => {
    if (!token) return "No token";
    const parts = token.split(".");
    if (parts.length === 3) {
      return `Header: ${parts[0].substring(0, 20)}...\nPayload: ${parts[1].substring(0, 20)}...\nSignature: ${parts[2].substring(0, 20)}...`;
    }
    return token.substring(0, 60) + "...";
  };

  // 🔴 Show message before redirect
  if (!token) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={{ color: "white" }}>
            🚫 Unauthorized - Redirecting to Login...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            🛡 SecureApp
            <span style={styles.logoBadge}>AUTHENTICATED</span>
          </div>
          <button style={styles.logoutBtn} onClick={logout}>
            Sign Out ↗
          </button>
        </div>

        {/* Status */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Session Status</div>
          <div style={styles.cardValue}>
            <span style={styles.statusDot}></span>
            Active Session — Token in sessionStorage
          </div>
        </div>

        {/* Token */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>JWT Token</div>
          <div style={styles.tokenBox}>{getTokenPreview()}</div>
        </div>

        {/* API */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Protected Endpoint — GET /protected</div>

          <button
            style={{ ...styles.fetchBtn, opacity: loading ? 0.7 : 1 }}
            onClick={getData}
            disabled={loading}
          >
            {loading ? "Fetching..." : "🔓 Fetch Protected Data"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {data && (
            <div style={styles.responseBox}>
              <div style={styles.responseLabel}>RESPONSE FROM SERVER</div>
              <p style={styles.responseText}>
                {data?.message || data}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;