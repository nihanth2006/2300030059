import NotificationCard from "./NotificationCard.jsx";

function PriorityInbox({ notifications }) {
  return (
    <div className="container">
      <h1>Priority Inbox</h1>
      <p>
        Showing top {notifications.length} priority notifications.
      </p>

      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        notifications.map((notification, index) => (
          <NotificationCard
            key={notification.ID}
            notification={notification}
            rank={index + 1}
          />
        ))
      )}
    </div>
  );
}

export { PriorityInbox };

export default PriorityInbox;