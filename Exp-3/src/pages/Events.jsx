import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const data = [
  {
    title: "Hackathon",
    tag: "24 Hours",
    desc: "Team up and build a real solution. Mentorship + prizes + certificate.",
    time: "10:00 AM - Next Day 10:00 AM",
    venue: "CSE Block",
  },
  {
    title: "Tech Talks",
    tag: "Speakers",
    desc: "Industry experts sessions on AI, Web3, Cloud, Career & Innovation.",
    time: "4:00 PM - 6:00 PM",
    venue: "Auditorium",
  },
  {
    title: "Workshops",
    tag: "Hands-on",
    desc: "Practical training on React, UI/UX, GitHub and AI tools.",
    time: "12:00 PM - 3:00 PM",
    venue: "Seminar Hall",
  },
];

function Events() {
  return (
    <div className="py-5">
      <Container>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Events</h2>
          <p className="text-muted mb-0">
            All TechFest 2026 events in one place
          </p>
        </div>

        <Row className="g-4 align-items-stretch">
          {data.map((e) => (
            <Col key={e.title} xs={12} lg={4}>
              <div className="event-box">
                <div className="d-flex justify-content-between align-items-start">
                  <h3 className="fw-bold mb-2">{e.title}</h3>
                  <span className="event-tag">{e.tag}</span>
                </div>

                <p className="mb-3">{e.desc}</p>

                <div className="mb-3">
                  <div>
                    <b>Time:</b> {e.time}
                  </div>
                  <div>
                    <b>Venue:</b> {e.venue}
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <Button as={NavLink} to="/event-details" variant="outline-dark">
                    Details
                  </Button>
                  <Button as={NavLink} to="/register" className="register-blue-btn">
                    Register
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Events;
