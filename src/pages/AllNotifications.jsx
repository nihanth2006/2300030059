import { useEffect, useMemo, useState } from "react";
import NotificationCard from "../components/NotificationCard.jsx";
import { fetchNotifications } from "../services/notificationService.js";
import "../App.css";

const NOTIFICATION_TYPES = ["All", "Placement", "Result", "Event"];

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [notificationType, setNotificationType] = useState("All");
  const [viewedMap, setViewedMap] = useState({});
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, [page, limit, notificationType]);

  const loadNotifications = async () => {
    setLoading(true);
    setError("");

    try {
      const token = import.meta.env.VITE_NOTIFICATION_TOKEN || "";
      const typeParam = notificationType === "All" ? undefined : notificationType;
      const data = await fetchNotifications(token, {
        limit,
        page,
        notificationType: typeParam,
      });

      setNotifications(data);
      setUsingMockData(!token);
    } catch (err) {
      setError("Unable to load notifications.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = useMemo(
    () => notifications.filter((item) => !viewedMap[item.ID]).length,
    [notifications, viewedMap]
  );

  const toggleViewed = (id) => {
    setViewedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container">
      <h1>All Notifications</h1>

      {usingMockData && (
        <div className="info-banner">
          Sample notifications shown (no API token)
        </div>
      )}

      <div className="filter-bar">
        <div>
          <label htmlFor="notificationType">Type</label>
          <select
            id="notificationType"
            value={notificationType}
            onChange={(event) => {
              setNotificationType(event.target.value);
              setPage(1);
            }}
          >
            {NOTIFICATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="limit">Page size</label>
          <select
            id="limit"
            value={limit}
            onChange={(event) => setLimit(Number(event.target.value))}
          >
            {[5, 10, 15, 20].map((value) => (
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

      <div className="status-line">
        <span>{unreadCount} unread</span>
        <span>{notifications.length} shown</span>
      </div>

      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.ID}
            notification={notification}
            viewed={!!viewedMap[notification.ID]}
            onToggleViewed={() => toggleViewed(notification.ID)}
          />
        ))
      )}

      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default AllNotifications;
