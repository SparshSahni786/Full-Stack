import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useState } from "react";

function Register() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="text-center mb-4">
              <h2 className="fw-bold">Event Registration</h2>
              <p className="text-muted mb-0">
                Register yourself for Chandigarh University TechFest 2026
              </p>
            </div>

            {submitted && (
              <Alert variant="success">
                Registration submitted! We’ll contact you soon.
              </Alert>
            )}

            <Form onSubmit={onSubmit} className="p-4 bg-light border rounded">
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control required placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control required placeholder="Enter phone number" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Select Event</Form.Label>
                <Form.Select required defaultValue="">
                  <option value="" disabled>
                    Choose an event
                  </option>
                  <option>Hackathon</option>
                  <option>Workshops</option>
                  <option>Tech Talks</option>
                </Form.Select>
              </Form.Group>

              <div className="d-grid">
                <button type="submit" className="cu-red-btn py-2">
                  Submit Registration
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
