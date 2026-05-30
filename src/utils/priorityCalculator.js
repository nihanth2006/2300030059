import { Log } from "../utils/logger";

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

export const getTopNotifications = async (
  notifications,
  limit = 10
) => {
  const sorted = [...notifications].sort(
    (a, b) => calculateScore(b) - calculateScore(a)
  );

  const top = sorted.slice(0, limit);

  await Log(
    "debug",
    "utils",
    `Calculated top ${limit} notifications from ${notifications.length} items`
  );

  return top;
};

export default getTopNotifications;
