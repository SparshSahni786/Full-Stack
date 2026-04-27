import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { useSelector } from "react-redux";
import AssistantWidget from "./AssistantWidget.jsx";
import CommandPalette from "./CommandPalette.jsx";
import Toaster from "./Toaster.jsx";

export default function Layout() {
  const location = useLocation();
  const nav = useNavigate();

  const [animateKey, setAnimateKey] = useState(0);

  const compactMode = useSelector((s) => s.app.compactMode);

  const [assistantOpen, setAssistantOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => setAnimateKey((k) => k + 1), [location.pathname]);

  useEffect(() => {
    document.body.setAttribute("data-compact", compactMode ? "true" : "false");
  }, [compactMode]);

  useEffect(() => {
    setAssistantOpen(false);
    setPaletteOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      const ctrl = e.ctrlKey || e.metaKey;

      // Esc closes overlays
      if (e.key === "Escape") {
        setAssistantOpen(false);
        setPaletteOpen(false);
        return;
      }

      // Ctrl+K -> Assistant
      if (ctrl && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setAssistantOpen((v) => !v);
        setPaletteOpen(false);
        return;
      }

      // Ctrl+P -> Command Palette
      if (ctrl && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        setAssistantOpen(false);
        return;
      }

      // Ctrl+T -> Tasks
      if (ctrl && (e.key === "t" || e.key === "T")) {
        e.preventDefault();
        nav("/tasks");
        return;
      }

      // Ctrl+R -> Reports
      if (ctrl && (e.key === "r" || e.key === "R")) {
        e.preventDefault();
        nav("/reports");
        return;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="content">
        <div className="page-transition" key={animateKey}>
          <Outlet />
        </div>
      </main>

      <Footer />

      {/* ✅ Notifications */}
      <Toaster />

      {/* ✅ Floating Assistant Button */}
      <button
        className="assistant-fab"
        onClick={() => {
          setAssistantOpen((v) => !v);
          setPaletteOpen(false);
        }}
        aria-label="Open Assistant"
        title="Assistant (Ctrl+K)"
        type="button"
      >
        <span className="assistant-fab-icon">✦</span>
      </button>

      {/* ✅ Command Palette */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* ✅ Assistant Slide Panel */}
      <div className={assistantOpen ? "assistant-panel open" : "assistant-panel"}>
        <div className="assistant-panel-head">
          <div className="assistant-panel-brand">
            <span className="assistant-badge">✦</span>
            <b>Assistant</b>
          </div>
          <button className="btn outline" onClick={() => setAssistantOpen(false)} type="button">
            Close
          </button>
        </div>

        <AssistantWidget compact />
      </div>

      {assistantOpen ? <div className="assistant-backdrop" onClick={() => setAssistantOpen(false)} /> : null}
    </div>
  );
}