import { Container, Form, Alert, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useTheme } from "../themeContext";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState(true);
  const [emails, setEmails] = useState(false);
  const [visibility, setVisibility] = useState("Public");
  const [eventType, setEventType] = useState("Hackathon");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Container className="py-5" style={{ maxWidth: 750 }}>
      <h2 className="fw-bold text-center mb-4">Settings</h2>

      {saved && (
        <Alert variant="success">
          Settings saved successfully!
        </Alert>
      )}

      <Form onSubmit={handleSave} className="p-4 bg-light border rounded shadow-sm">

        {/* Theme Toggle */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Theme Mode</Form.Label>
          <Form.Check
            type="switch"
            label={theme === "dark" ? "Dark Mode Enabled" : "Light Mode Enabled"}
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
        </Form.Group>

        {/* Notifications */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Notifications</Form.Label>
          <Form.Check
            type="switch"
            label="Enable event notifications"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </Form.Group>

        {/* Email Updates */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Email Updates</Form.Label>
          <Form.Check
            type="switch"
            label="Receive updates about new events and workshops"
            checked={emails}
            onChange={() => setEmails(!emails)}
          />
        </Form.Group>

        {/* Profile Visibility */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Profile Visibility</Form.Label>
          <Form.Select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option>Public</option>
            <option>Private</option>
            <option>Only Registered Users</option>
          </Form.Select>
        </Form.Group>

        {/* Preferred Event Type */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Preferred Event Type</Form.Label>
          <Form.Select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option>Hackathon</option>
            <option>Workshops</option>
            <option>Tech Talks</option>
            <option>All Events</option>
          </Form.Select>
        </Form.Group>

        {/* Save Button */}
        <div className="d-grid">
          <button type="submit" className="register-blue-btn py-2">
            Save Settings
          </button>
        </div>

      </Form>
    </Container>
  );
}

export default Settings;
