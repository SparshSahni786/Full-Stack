import React, { useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/AppContext.jsx";
import { clearCompleted } from "../redux/slices/appSlice";

export default function Reports() {
  const { state } = useContext(AppContext);
  const dispatch = useDispatch();
  const tasks = useSelector((s) => s.app.tasks);

  const [msg, setMsg] = useState("");

  const report = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;

    const high = tasks.filter((t) => t.priority === "high").length;
    const med = tasks.filter((t) => t.priority === "medium").length;
    const low = tasks.filter((t) => t.priority === "low").length;

    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, completed, active, high, med, low, completionRate };
  }, [tasks]);

  // ✅ useMemo: show top 3 pending (priority-wise)
  const topPending = useMemo(() => {
    const rank = (p) => (p === "high" ? 3 : p === "medium" ? 2 : 1);
    return tasks
      .filter((t) => !t.completed)
      .slice()
      .sort((a, b) => rank(b.priority) - rank(a.priority))
      .slice(0, 3);
  }, [tasks]);

  const onClear = () => {
    dispatch(clearCompleted());
    setMsg("✅ Cleared completed tasks");
    window.setTimeout(() => setMsg(""), 1200);
  };

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h2 className="page-title">Reports</h2>
          <p className="page-subtitle">
            Theme: <b>{state.theme}</b> | User: <b>{state.user?.name}</b>
          </p>
          {msg ? <div className="toast">{msg}</div> : null}
        </div>

        <button className="btn outline" onClick={onClear}>
          Clear Completed
        </button>
      </div>

      <div className="grid-3">
        <div className="card">
          <h3 className="card-title">Tasks</h3>
          <div className="big">{report.total}</div>
          <p className="muted">Active: {report.active} | Completed: {report.completed}</p>
        </div>

        <div className="card">
          <h3 className="card-title">Priority Split</h3>
          <div className="split" style={{ marginTop: 10 }}>
            <div className="split-row">
              <span className="dot high" /> High <b>{report.high}</b>
            </div>
            <div className="split-row">
              <span className="dot med" /> Medium <b>{report.med}</b>
            </div>
            <div className="split-row">
              <span className="dot low" /> Low <b>{report.low}</b>
            </div>
          </div>
        </div>

        <div className="card soft">
          <h3 className="card-title">Completion</h3>
          <div className="progress" style={{ marginTop: 10 }}>
            <div className="bar" style={{ width: `${report.completionRate}%` }} />
          </div>
          <p className="muted" style={{ marginTop: 8 }}>
            {report.completionRate}% completed
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 14 }}>
        <div className="card">
          <h3 className="card-title">Top Pending</h3>
          <p className="muted" style={{ marginTop: 6 }}>
            Highest priority pending tasks
          </p>

          {topPending.length === 0 ? (
            <p className="muted" style={{ marginTop: 10 }}>No pending tasks 🎉</p>
          ) : (
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
              {topPending.map((t) => (
                <div
                  key={t.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <b>{t.title}</b>
                    <span className="muted" style={{ fontSize: 12 }}>
                      Priority:{" "}
                      <b className={t.priority === "high" ? "p-high" : t.priority === "medium" ? "p-med" : "p-low"}>
                        {t.priority}
                      </b>
                    </span>
                  </div>
                  <span className="pill">Pending</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card soft">
          <h3 className="card-title">Tips</h3>
          <p className="muted" style={{ marginTop: 6 }}>
            • Use filters in Tasks page for quick view<br />
            • Compact Mode reduces spacing<br />
            • Dark mode improves readability at night
          </p>
        </div>
      </div>
    </div>
  );
}