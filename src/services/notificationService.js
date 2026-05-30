import axios from "axios";
import { getMockNotifications } from "./mockNotifications.js";

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

export const fetchNotifications = async (token, query = {}) => {
  if (!token) {
    console.warn("fetchNotifications: no token provided, using mock data");
    return getMockNotifications();
  }

  try {
    const params = {
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.page ? { page: query.page } : {}),
      ...(query.notificationType ? { notification_type: query.notificationType } : {}),
    };

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data.notifications || getMockNotifications();
  } catch (err) {
    console.error("fetchNotifications error:", err);
    return getMockNotifications();
  }
};