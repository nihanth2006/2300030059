import axios from "axios";
import { getMockNotifications } from "./mockNotifications.js";
import { Log } from "../utils/logger";

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

export const fetchNotifications = async (token, query = {}) => {
  if (!token) {
    console.warn("fetchNotifications: no token provided, using mock data");

    await Log(
      "warn",
      "service",
      "No auth token provided, using mock notifications"
    );

    return getMockNotifications();
  }

  try {
    const params = {
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.page ? { page: query.page } : {}),
      ...(query.notificationType
        ? { notification_type: query.notificationType }
        : {}),
    };

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    await Log(
      "info",
      "service",
      `Fetched notifications successfully (count: ${
        response.data.notifications?.length || 0
      })`
    );

    return response.data.notifications || getMockNotifications();
  } catch (err) {
    console.error("fetchNotifications error:", err);

    await Log(
      "error",
      "service",
      `API fetch failed, falling back to mock: ${err.message}`
    );

    return getMockNotifications();
  }
};
