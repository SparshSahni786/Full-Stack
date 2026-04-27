import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRsvp } from "../redux/slices/appSlice";

export default function RSVP() {
  const dispatch = useDispatch();
  const rsvpStatus = useSelector((s) => s.app.rsvpStatus);

  const set = (val) => dispatch(setRsvp(val));

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h2 className="page-title">RSVP</h2>
          <p className="page-subtitle">Confirm your attendance</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="card-title">Your Response</h3>

          <div className="row" style={{ marginTop: 10 }}>
            <button
              className={rsvpStatus === "yes" ? "chip active" : "chip"}
              onClick={() => set("yes")}
            >
              Yes
            </button>
            <button
              className={rsvpStatus === "maybe" ? "chip active" : "chip"}
              onClick={() => set("maybe")}
            >
              Maybe
            </button>
            <button
              className={rsvpStatus === "no" ? "chip active" : "chip"}
              onClick={() => set("no")}
            >
              No
            </button>
          </div>

          <div className="callout" style={{ marginTop: 14 }}>
            Selected: <b>{rsvpStatus.toUpperCase()}</b>
          </div>
        </div>

        <div className="card soft">
          <h3 className="card-title">Quick Info</h3>
          <p className="muted" style={{ marginTop: 6 }}>
            📍 CU Main Auditorium <br />
            🗓 March 2026 <br />
            ⏰ 10 AM onwards
          </p>
        </div>
      </div>
    </div>
  );
}