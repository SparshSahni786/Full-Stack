import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearActivity } from "../redux/slices/appSlice";

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}

export default function Activity() {
  const dispatch = useDispatch();
  const logs = useSelector((s) => s.app.activityLogs);

  // useMemo just to show optimization (not heavy, but OK)
  const items = useMemo(() => logs, [logs]);

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h2 className="page-title">Activity</h2>
          <p className="page-subtitle">Timeline of actions (Redux powered)</p>
        </div>

        <button className="btn outline" onClick={() => dispatch(clearActivity())}>
          Clear Activity
        </button>
      </div>

      <div className="card">
        <h3 className="card-title">Recent Events</h3>

        {items.length === 0 ? (
          <p className="muted" style={{ marginTop: 10 }}>
            No activity yet.
          </p>
        ) : (
          <div className="timeline" style={{ marginTop: 12 }}>
            {items.map((x) => (
              <div className="timeline-item" key={x.id}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-text">{x.text}</div>
                  <div className="timeline-time muted">{formatTime(x.ts)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card soft" style={{ marginTop: 14 }}>
        <h3 className="card-title">Tip</h3>
        <p className="muted" style={{ marginTop: 6 }}>
          Use Assistant commands like <b>add task:</b>, <b>clear completed</b>,{" "}
          <b>theme dark</b> — events will appear here.
        </p>
      </div>
    </div>
  );
}