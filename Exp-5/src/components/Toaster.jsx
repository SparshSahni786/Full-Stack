import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../redux/slices/appSlice";

export default function Toaster() {
  const dispatch = useDispatch();

  // ✅ defensive selector: if app or toasts missing, use []
  const toasts = useSelector((s) => (s && s.app && Array.isArray(s.app.toasts) ? s.app.toasts : []));

  useEffect(() => {
    if (!toasts.length) return;

    const timers = toasts.map((t) =>
      window.setTimeout(() => dispatch(removeToast(t.id)), 2600)
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [toasts, dispatch]);

  return (
    <div className="toaster">
      {toasts.slice(-4).map((t) => (
        <button
          key={t.id}
          className={`toast2 ${t.type || "info"}`}
          onClick={() => dispatch(removeToast(t.id))}
          type="button"
          title="Click to dismiss"
        >
          <span className="toast2-dot" />
          <span className="toast2-text">{t.text}</span>
        </button>
      ))}
    </div>
  );
}