import { Log } from "../utils/logger";

function NotificationCard({ notification, rank, viewed, onToggleViewed }) {
  const handleToggleViewed = async () => {
    await Log(
      "info",
      "component",
      `${notification.Type} notification marked as ${
        viewed ? "unread" : "read"
      }`
    );

    onToggleViewed();
  };

  return (
    <div className={`notification-card ${viewed ? "viewed" : "unread"}`}>
      <div className="notification-card-header">
        <div className="rank">#{rank}</div>
        <button className="view-toggle" onClick={handleToggleViewed}>
          {viewed ? "Mark unread" : "Mark read"}
        </button>
      </div>

      <h3>{notification.Type}</h3>

      <p>{notification.Message}</p>

      <small>{notification.Timestamp}</small>
    </div>
  );
}

export { NotificationCard };

export default NotificationCard;
