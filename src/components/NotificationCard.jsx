function NotificationCard({ notification, rank, viewed, onToggleViewed }) {
  return (
    <div className={`notification-card ${viewed ? "viewed" : "unread"}`}>
      <div className="notification-card-header">
        <div className="rank">#{rank}</div>
        <button className="view-toggle" onClick={onToggleViewed}>
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