import { Container, Row, Col, Card, ProgressBar, Table, Badge } from "react-bootstrap";

const kpis = [
  { label: "Visitors", value: 12840, sub: "+12% this week", bar: 72 },
  { label: "Registrations", value: 3680, sub: "+9% this week", bar: 58 },
  { label: "Workshop Seats", value: 980, sub: "60% filled", bar: 60 },
  { label: "RSVP Responses", value: 1240, sub: "Growing daily", bar: 45 },
];

const sources = [
  { name: "Instagram", percent: 42, trend: "up" },
  { name: "WhatsApp", percent: 28, trend: "up" },
  { name: "College Website", percent: 18, trend: "flat" },
  { name: "Walk-in", percent: 12, trend: "flat" },
];

const recent = [
  { time: "Today 10:20 AM", action: "New registration", info: "Hackathon - Team entry" },
  { time: "Today 11:05 AM", action: "New RSVP", info: "Attending - Workshop" },
  { time: "Today 12:30 PM", action: "Contact message", info: "Query about timing" },
  { time: "Today 01:10 PM", action: "New registration", info: "Tech Talk pass" },
];

function Analytics() {
  return (
    <div className="py-5 bg-light">
      <Container>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Analytics Dashboard</h2>
          <p className="text-muted mb-0">Quick insights for TechFest 2026 engagement</p>
        </div>

        {/* KPI Cards */}
        <Row className="g-4 mb-4">
          {kpis.map((k) => (
            <Col key={k.label} xs={12} md={6} lg={3}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="text-muted">{k.label}</div>
                      <h3 className="fw-bold mb-1">{k.value.toLocaleString()}</h3>
                      <div className="text-success" style={{ fontSize: 13 }}>
                        {k.sub}
                      </div>
                    </div>
                    <Badge bg="dark">Live</Badge>
                  </div>
                  <div className="mt-3">
                    <ProgressBar now={k.bar} />
                    <div className="text-muted mt-1" style={{ fontSize: 12 }}>
                      Progress: {k.bar}%
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Traffic + Recent Activity */}
        <Row className="g-4">
          <Col xs={12} lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <h5 className="fw-bold mb-3">Traffic Sources</h5>
                <div className="border rounded bg-white p-2">
                  <Table responsive bordered hover className="mb-0">
                    <thead>
                      <tr>
                        <th>Source</th>
                        <th style={{ width: 120 }}>Share</th>
                        <th style={{ width: 120 }}>Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sources.map((s) => (
                        <tr key={s.name}>
                          <td><b>{s.name}</b></td>
                          <td>{s.percent}%</td>
                          <td>
                            {s.trend === "up" ? (
                              <span className="text-success fw-bold">▲ Up</span>
                            ) : (
                              <span className="text-muted fw-bold">— Flat</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <h5 className="fw-bold mb-3">Recent Activity</h5>
                <div className="border rounded bg-white p-2">
                  <Table responsive bordered hover className="mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: 150 }}>Time</th>
                        <th>Action</th>
                        <th>Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recent.map((r, idx) => (
                        <tr key={idx}>
                          <td>{r.time}</td>
                          <td><b>{r.action}</b></td>
                          <td>{r.info}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Summary */}
        <Card className="shadow-sm mt-4">
          <Card.Body>
            <h5 className="fw-bold mb-2">Summary</h5>
            <p className="mb-0 text-muted">
              Engagement is rising mainly from social platforms. Workshop seats are filling fast — promote RSVP
              and registration links for faster conversion.
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Analytics;
