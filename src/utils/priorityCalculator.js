const TYPE_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const calculateScore = (notification) => {
  const weight = TYPE_WEIGHTS[notification.Type] || 0;

  const timestamp = new Date(
    notification.Timestamp.replace(" ", "T")
  ).getTime();

  return weight * 1000000 + timestamp;
};

export const getTopNotifications = (
  notifications,
  limit = 10
) => {
  return [...notifications]
    .sort(
      (a, b) =>
        calculateScore(b) -
        calculateScore(a)
    )
    .slice(0, limit);
};

export default getTopNotifications;