import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard.jsx";
import { fetchNotifications } from "../services/notificationService.js";
import getTopNotifications from "../utils/priorityCalculator.js";
import "../App.css";

const TOP_OPTIONS = [5, 10, 15, 20];

function PriorityPage() {
  const [notifications, setNotifications] = useState([]);
  const [topN, setTopN] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewedMap, setViewedMap] = useState({});
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, [topN]);

  const loadNotifications = async () => {
    setLoading(true);
    setError("");

    try {
      const token = import.meta.env.VITE_NOTIFICATION_TOKEN || "";
      const data = await fetchNotifications(token, { limit: topN, page: 1 });
      setNotifications(getTopNotifications(data, topN));
      setUsingMockData(!token);
    } catch (err) {
      setError("Unable to load priority notifications.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleViewed = (id) => {
    setViewedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container">
      <h1>Priority Inbox</h1>

      {usingMockData && (
        <div className="info-banner">
          Sample notifications shown (no API token)
        </div>
      )}

      <div className="filter-bar">
        <div>
          <label htmlFor="topN">Show top</label>
          <select
            id="topN"
            value={topN}
            onChange={(event) => setTopN(Number(event.target.value))}
          >
            {TOP_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="status">
          {usingMockData
            ? "Sample notifications shown (no API token)"
            : "Protected API active"}
        </div>
      </div>

      {loading ? (
        <p>Loading priority notifications...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : notifications.length === 0 ? (
        <p>No priority notifications available.</p>
      ) : (
        notifications.map((notification, index) => (
          <NotificationCard
            key={notification.ID}
            notification={notification}
            rank={index + 1}
            viewed={!!viewedMap[notification.ID]}
            onToggleViewed={() => toggleViewed(notification.ID)}
          />
        ))
      )}
    </div>
  );
}

export default PriorityPage;
