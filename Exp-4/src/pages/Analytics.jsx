import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext.jsx";

export default function Analytics() {
  const { state } = useContext(AppContext);

  const stats = useMemo(() => {
    const total = state.tasks.length;
    const completed = state.tasks.filter((t) => t.completed).length;
    const active = total - completed;

    const high = state.tasks.filter((t) => t.priority === "high").length;
    const med = state.tasks.filter((t) => t.priority === "medium").length;
    const low = state.tasks.filter((t) => t.priority === "low").length;

    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, completed, active, high, med, low, completionRate };
  }, [state.tasks]);

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h2 className="page-title">Analytics</h2>
          <p className="page-subtitle">Derived using useMemo</p>
        </div>
      </div>

      <div className="grid-3">
        <div className="card">
          <h3 className="card-title">Total Tasks</h3>
          <div className="big">{stats.total}</div>
          <p className="muted">All created tasks</p>
        </div>
        <div className="card">
          <h3 className="card-title">Completed</h3>
          <div className="big">{stats.completed}</div>
          <p className="muted">Finished</p>
        </div>
        <div className="card">
          <h3 className="card-title">Active</h3>
          <div className="big">{stats.active}</div>
          <p className="muted">Pending</p>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 14 }}>
        <div className="card soft">
          <h3 className="card-title">Completion Rate</h3>
          <div className="progress">
            <div className="bar" style={{ width: `${stats.completionRate}%` }} />
          </div>
          <p className="muted" style={{ marginTop: 8 }}>
            {stats.completionRate}% tasks completed
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">Priority Split</h3>
          <div className="split">
            <div className="split-row">
              <span className="dot high" /> High <b>{stats.high}</b>
            </div>
            <div className="split-row">
              <span className="dot med" /> Medium <b>{stats.med}</b>
            </div>
            <div className="split-row">
              <span className="dot low" /> Low <b>{stats.low}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
