import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "Chandigarh University",
    track: "Hackathon",
  });

  const submit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return alert("Enter your name");
    if (!form.email.includes("@")) return alert("Enter valid email");
    if (form.phone.trim().length < 10) return alert("Enter valid phone number");

    alert("Registered successfully (mock) ✅");
    setForm({
      name: "",
      email: "",
      phone: "",
      college: "Chandigarh University",
      track: "Hackathon",
    });
  };

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h2 className="page-title">Register</h2>
          <p className="page-subtitle">Fill details to join TechFest 2026</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card soft">
          <h3 className="card-title">Registration Form</h3>

          <form className="form-col" onSubmit={submit}>
            <input
              className="input"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="input"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="input"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <select
              className="input"
              value={form.track}
              onChange={(e) => setForm({ ...form, track: e.target.value })}
            >
              <option>Hackathon</option>
              <option>Workshop</option>
              <option>Tech Talk</option>
              <option>Coding Contest</option>
              <option>Project Expo</option>
            </select>

            <button className="btn full" type="submit">
              Submit Registration
            </button>
          </form>
        </div>

        <div className="stack">
          <div className="card">
            <h3 className="card-title">Why Register?</h3>
            <ul className="feature-list">
              <li>✓ Participate in events</li>
              <li>✓ Certificates & goodies</li>
              <li>✓ Workshops & tech talks</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="card-title">Venue</h3>
            <p className="muted">Chandigarh University, Main Auditorium</p>
          </div>
        </div>
      </div>
    </div>
  );
}
