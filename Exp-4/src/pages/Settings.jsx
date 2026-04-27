import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

export default function Settings() {
  const { state, dispatch, setTheme } = useContext(AppContext);

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h2 className="page-title">Settings</h2>
          <p className="page-subtitle">Theme & preferences</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="card-title">Theme</h3>
          <p className="muted">Switch between Light and Dark mode.</p>

          <div className="row" style={{ marginTop: 12 }}>
            <button
              className={state.theme === "light" ? "chip active" : "chip"}
              onClick={() => setTheme("light")}
            >
              Light
            </button>
            <button
              className={state.theme === "dark" ? "chip active" : "chip"}
              onClick={() => setTheme("dark")}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Preferences</h3>

          <div className="setting-row">
            <div>
              <div className="strong">Notifications</div>
              <div className="muted">Get event updates (mock)</div>
            </div>
            <button
              className={state.notifications ? "toggle on" : "toggle"}
              onClick={() => dispatch({ type: "TOGGLE_NOTIFICATIONS" })}
              type="button"
            >
              <span />
            </button>
          </div>

          <div className="setting-row">
            <div>
              <div className="strong">Compact Mode</div>
              <div className="muted">Tighter spacing on pages</div>
            </div>
            <button
              className={state.compactMode ? "toggle on" : "toggle"}
              onClick={() => dispatch({ type: "TOGGLE_COMPACT" })}
              type="button"
            >
              <span />
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <h3 className="card-title">Current Values</h3>
        <p className="muted" style={{ marginTop: 6 }}>
          Theme: <b>{state.theme}</b> | Notifications:{" "}
          <b>{state.notifications ? "ON" : "OFF"}</b> | Compact:{" "}
          <b>{state.compactMode ? "ON" : "OFF"}</b>
        </p>
      </div>
    </div>
  );
}
