import { Container, Form, Alert } from "react-bootstrap";
import { useState } from "react";

function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <Container className="py-5" style={{ maxWidth: 700 }}>
      <h2 className="fw-bold text-center mb-4">Contact Us</h2>

      {sent && (
        <Alert variant="success">
          Thanks <b>{name || "Student"}</b>! Your message has been submitted.
        </Alert>
      )}

      <Form onSubmit={onSubmit} className="p-4 bg-light border rounded">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control required as="textarea" rows={4} placeholder="Write message..." />
        </Form.Group>

        <div className="d-grid">
          <button type="submit" className="register-blue-btn py-2">
            Submit
          </button>
        </div>
      </Form>
    </Container>
  );
}

export default Contact;
