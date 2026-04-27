import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import RSVP from "./pages/RSVP";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
