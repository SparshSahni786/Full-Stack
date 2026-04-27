import { Container, Row, Col, Card, Badge, Table, Button, ProgressBar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const schedule = [
  { time: "09:30 AM", activity: "Registration & Welcome", place: "Main Gate" },
  { time: "10:00 AM", activity: "Hackathon Kickoff", place: "CSE Block" },
  { time: "12:00 PM", activity: "Workshops Begin", place: "Seminar Hall" },
  { time: "02:00 PM", activity: "Mentor Round", place: "CSE Labs" },
  { time: "04:00 PM", activity: "Tech Talks", place: "Auditorium" },
  { time: "06:30 PM", activity: "Networking + Refreshments", place: "Food Court" },
];

const highlights = [
  { title: "Hackathon", tag: "24 Hours", desc: "Build, pitch, and win prizes with mentorship and certificates." },
  { title: "Workshops", tag: "Hands-on", desc: "React, UI/UX, GitHub, and AI tools — practical learning sessions." },
  { title: "Tech Talks", tag: "Speakers", desc: "Industry experts talk about AI, Web3, Cloud, and Careers." },
];

function EventDetails() {
  return (
    <div className="py-5">
      <Container>
        {/* Header Banner */}
        <div className="p-4 p-md-5 rounded shadow-sm mb-4" style={{ background: "rgba(177, 18, 38, 0.08)" }}>
          <Row className="align-items-center g-4">
            <Col md={8}>
              <h2 className="fw-bold mb-2">Chandigarh University TechFest 2026</h2>
              <p className="text-muted mb-3">
                Full schedule, highlights, and quick info — everything in one place.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Badge bg="danger">20 Feb 2026</Badge>
                <Badge bg="dark">Auditorium + D Block</Badge>
                <Badge bg="primary">Hackathon • Workshops • Talks</Badge>
              </div>
            </Col>

            <Col md={4} className="text-md-end">
              <Button as={NavLink} to="/register" className="register-blue-btn px-4 py-2 me-2">
                Register
              </Button>
              <Button as={NavLink} to="/events" variant="outline-dark" className="px-4 py-2">
                View Events
              </Button>
            </Col>
          </Row>
        </div>

        {/* Highlights */}
        <Row className="g-4 mb-4">
          {highlights.map((h) => (
            <Col key={h.title} xs={12} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <h4 className="fw-bold mb-2">{h.title}</h4>
                    <span className="event-tag">{h.tag}</span>
                  </div>
                  <p className="mb-0">{h.desc}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Stats + Progress */}
        <Row className="g-4 mb-4">
          <Col xs={12} lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <h5 className="fw-bold mb-3">Event Quick Stats</h5>

                <div className="d-flex justify-content-between">
                  <span>Expected Participants</span>
                  <b>1500+</b>
                </div>
                <ProgressBar now={75} className="mb-3" />

                <div className="d-flex justify-content-between">
                  <span>Workshop Seats Filled</span>
                  <b>60%</b>
                </div>
                <ProgressBar now={60} className="mb-3" />

                <div className="d-flex justify-content-between">
                  <span>Hackathon Teams Registered</span>
                  <b>40%</b>
                </div>
                <ProgressBar now={40} />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <h5 className="fw-bold mb-3">Rules & Notes</h5>
                <ul className="mb-0">
                  <li>Carry your College ID for entry.</li>
                  <li>Hackathon team size: 2–4 members.</li>
                  <li>Workshops have limited seats (first come, first served).</li>
                  <li>Certificates will be provided to participants.</li>
                  <li>Follow event coordinator instructions.</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Schedule Table */}
        <Card className="shadow-sm">
          <Card.Body>
            <h5 className="fw-bold mb-3">Schedule</h5>
            <div className="border rounded bg-light p-2">
              <Table responsive bordered hover className="mb-0">
                <thead>
                  <tr>
                    <th style={{ width: "120px" }}>Time</th>
                    <th>Activity</th>
                    <th style={{ width: "180px" }}>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((s) => (
                    <tr key={s.time}>
                      <td><b>{s.time}</b></td>
                      <td>{s.activity}</td>
                      <td>{s.place}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default EventDetails;
