import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PriorityPage from "./pages/PriorityPage.jsx";
import AllNotifications from "./pages/AllNotifications.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">Campus Notifications</div>
          <nav className="nav-links">
            <Link to="/" className="nav-link">
              Priority Inbox
            </Link>
            <Link to="/all" className="nav-link">
              All Notifications
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<PriorityPage />} />
          <Route path="/all" element={<AllNotifications />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
