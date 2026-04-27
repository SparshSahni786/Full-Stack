import { Container, Form, Alert, Table } from "react-bootstrap";
import { useState } from "react";

function RSVP() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [done, setDone] = useState(false);

  const [rsvpList, setRsvpList] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    if (!name || !email || !status) return;

    const newEntry = {
      name,
      email,
      status,
      time: new Date().toLocaleString(),
    };

    setRsvpList((prev) => [newEntry, ...prev]);
    setDone(true);

    setName("");
    setEmail("");
    setStatus("");

    setTimeout(() => setDone(false), 1500);
  };

  return (
    <Container className="py-5" style={{ maxWidth: 850 }}>
      <h2 className="fw-bold text-center mb-4">RSVP</h2>

      {done && <Alert variant="success">RSVP submitted successfully!</Alert>}

      <Form onSubmit={submit} className="p-4 bg-light border rounded mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Will you attend?</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option>Yes</option>
            <option>No</option>
            <option>Maybe</option>
          </Form.Select>
        </Form.Group>

        <div className="d-grid">
          <button type="submit" className="cu-red-btn py-2">
            Submit RSVP
          </button>
        </div>
      </Form>

      <h4 className="fw-bold mb-3">RSVP List</h4>

      {rsvpList.length === 0 ? (
        <p className="text-muted">No RSVPs yet. Submit one to see it here.</p>
      ) : (
        <div className="border rounded bg-light p-3">
          <Table responsive bordered hover className="mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {rsvpList.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.status}</td>
                  <td>{r.time}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default RSVP;
