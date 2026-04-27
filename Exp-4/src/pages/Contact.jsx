import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  const submit = (e) => {
    e.preventDefault();
    alert("Message submitted (mock) ✅");
    setForm({ name: "", email: "", msg: "" });
  };

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h2 className="page-title">Contact</h2>
          <p className="page-subtitle">We usually reply within 24 hours.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card soft">
          <h3 className="event-title">Send us a message</h3>

          <form className="form-col" onSubmit={submit}>
            <input
              className="input"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="input"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              className="input"
              rows="5"
              placeholder="Message"
              value={form.msg}
              onChange={(e) => setForm({ ...form, msg: e.target.value })}
            />
            <button className="btn" type="submit">Send</button>
          </form>
        </div>

        <div className="stack">
          <div className="card">
            <h3 className="event-title">Venue</h3>
            <p className="muted">Chandigarh University, Main Auditorium</p>
          </div>

          <div className="card">
            <h3 className="event-title">Email</h3>
            <p className="muted">techfest@cumail.edu (mock)</p>
          </div>

          <div className="card">
            <h3 className="event-title">Phone</h3>
            <p className="muted">+91 90000 00000 (mock)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
