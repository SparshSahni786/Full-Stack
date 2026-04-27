import { Container, Row, Col, Card, Table } from "react-bootstrap";

const plans = [
  { name: "Basic", price: "₹0", bestFor: "Entry", features: ["Pass", "Certificate"] },
  { name: "Pro", price: "₹499", bestFor: "Most Students", features: ["Pass", "Certificate", "Workshop Access"] },
  { name: "Premium", price: "₹999", bestFor: "All Access", features: ["All Events", "Certificate", "Priority Entry"] },
];

function Pricing() {
  return (
    <div className="py-5 bg-light">
      <Container>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Pricing & Offers</h2>
          <p className="text-muted mb-0">Choose a pass that fits you</p>
        </div>

        {/* Offers in one row */}
        <Row className="g-4 mb-4">
          {plans.map((p) => (
            <Col key={p.name} xs={12} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <Card.Title className="fw-bold">{p.name}</Card.Title>
                    <span className="event-tag">{p.bestFor}</span>
                  </div>
                  <h3 className="mt-2">{p.price}</h3>
                  <ul className="mt-3 mb-0">
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Comparison Table */}
        <div className="border rounded bg-white p-3 shadow-sm">
          <h5 className="fw-bold mb-3">Comparison Table</h5>
          <Table responsive bordered className="mb-0">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Basic</th>
                <th>Pro</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Event Pass</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
              </tr>
              <tr>
                <td>Certificate</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
              </tr>
              <tr>
                <td>Workshop Access</td>
                <td>✖</td>
                <td>✔</td>
                <td>✔</td>
              </tr>
              <tr>
                <td>Priority Entry</td>
                <td>✖</td>
                <td>✖</td>
                <td>✔</td>
              </tr>
              <tr>
                <td>All Events Access</td>
                <td>✖</td>
                <td>✖</td>
                <td>✔</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default Pricing;
