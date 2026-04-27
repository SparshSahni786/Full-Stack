import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

export default function RSVP() {
  const { state, dispatch } = useContext(AppContext);

  const set = (val) => dispatch({ type: "SET_RSVP", payload: val });

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
              className={state.rsvpStatus === "yes" ? "chip active" : "chip"}
              onClick={() => set("yes")}
            >
              Yes
            </button>
            <button
              className={state.rsvpStatus === "maybe" ? "chip active" : "chip"}
              onClick={() => set("maybe")}
            >
              Maybe
            </button>
            <button
              className={state.rsvpStatus === "no" ? "chip active" : "chip"}
              onClick={() => set("no")}
            >
              No
            </button>
          </div>

          <div className="callout" style={{ marginTop: 14 }}>
            Selected: <b>{state.rsvpStatus.toUpperCase()}</b>
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
