import React from "react";
import { Link } from "react-router-dom";

export default function EventDetails() {
  const schedule = [
    { time: "10:00 AM", title: "Opening Ceremony", place: "Main Auditorium" },
    { time: "11:00 AM", title: "Workshop Sessions", place: "Lab Block" },
    { time: "01:00 PM", title: "Tech Talk", place: "Seminar Hall" },
    { time: "03:00 PM", title: "Coding Contest", place: "Lab Block" },
    { time: "05:00 PM", title: "Prize Distribution", place: "Main Auditorium" },
  ];

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h2 className="page-title">Event Details</h2>
          <p className="page-subtitle">
            Schedule, venue & quick actions.
          </p>
        </div>
        <div className="row">
          <Link to="/rsvp" className="btn outline">RSVP</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="event-title">Venue & Date</h3>
          <p className="muted">
            📍 Chandigarh University, Main Auditorium <br />
            🗓 March 2026 <br />
            ⏰ 10 AM onwards
          </p>
        </div>

        <div className="card">
          <h3 className="event-title">Highlights</h3>
          <ul className="feature-list">
            <li>✓ Hackathons, Workshops, Talks</li>
            <li>✓ Certificates for participants</li>
            <li>✓ Prizes & Swags</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 className="event-title">Schedule</h3>

        <div className="schedule">
          {schedule.map((s, i) => (
            <div className="schedule-row" key={i}>
              <div className="time">{s.time}</div>
              <div className="info">
                <div className="strong">{s.title}</div>
                <div className="muted">{s.place}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
