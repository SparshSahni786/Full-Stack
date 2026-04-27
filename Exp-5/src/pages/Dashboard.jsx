import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../context/AppContext.jsx";

function useCountUp(value, ms = 700) {
  const [v, setV] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const from = v;
    const to = value;

    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(from + (to - from) * eased);
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return v;
}

export default function Dashboard() {
  const { state } = useContext(AppContext);
  const tasks = useSelector((s) => s.app.tasks);
  const logs = useSelector((s) => s.app.activityLogs);
  const rsvp = useSelector((s) => s.app.rsvpStatus);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const high = tasks.filter((t) => t.priority === "high").length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, high, completionRate };
  }, [tasks]);

  const aTotal = useCountUp(stats.total);
  const aPending = useCountUp(stats.pending);
  const aCompleted = useCountUp(stats.completed);
  const aHigh = useCountUp(stats.high);

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">
            Welcome <b>{state.user?.name}</b> • Theme <b>{state.theme}</b>
          </p>
        </div>
        <div className="kpi-badge">
          RSVP: <b>{String(rsvp).toUpperCase()}</b>
        </div>
      </div>

      <div className="grid">
        <div className="card kpi glow">
          <div className="kpi-label muted">Total Tasks</div>
          <div className="kpi-value">{aTotal}</div>
          <div className="kpi-foot muted">All created tasks</div>
        </div>

        <div className="card kpi glow2">
          <div className="kpi-label muted">Pending</div>
          <div className="kpi-value">{aPending}</div>
          <div className="kpi-foot muted">Needs attention</div>
        </div>

        <div className="card kpi glow3">
          <div className="kpi-label muted">Completed</div>
          <div className="kpi-value">{aCompleted}</div>
          <div className="kpi-foot muted">Done tasks</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 14 }}>
        <div className="card soft">
          <h3 className="card-title">Completion</h3>
          <div className="progress" style={{ marginTop: 10 }}>
            <div className="bar" style={{ width: `${stats.completionRate}%` }} />
          </div>
          <p className="muted" style={{ marginTop: 8 }}>
            {stats.completionRate}% completion rate
          </p>
          <div style={{ marginTop: 12 }}>
            High priority tasks: <b className="p-high">{aHigh}</b>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Recent Activity</h3>
          <div className="mini-feed" style={{ marginTop: 10 }}>
            {logs.slice(0, 5).map((x) => (
              <div key={x.id} className="mini-feed-item">
                <span className="mini-dot" />
                <span>{x.text}</span>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 10, fontSize: 12 }}>
            Tip: Press <b>Ctrl+P</b> for Command Palette • <b>Ctrl+K</b> for Assistant
          </p>
        </div>
      </div>
    </div>
  );
}