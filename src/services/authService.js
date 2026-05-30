import axios from "axios";
import { Log } from "../utils/logger";

const AUTH_URL =
  "http://4.224.186.213/evaluation-service/auth";

export const getToken = async () => {
  try {
    const response = await axios.post(AUTH_URL, {
      email: "nihanth1006@gmail.com",
      name: "nihanth",
      rollNo: "2300030059",
      accessCode: "AvrAAK",
      clientID: "1c223e9b-0ebe-4759-b8b4-85e94c49bb83",
      clientSecret: "eteVmFfhXBzBswxS",
    });

    await Log(
      "info",
      "service",
      "Authentication token generated successfully"
    );

    return response.data.access_token;
  } catch (error) {
    await Log(
      "error",
      "service",
      `Authentication failed: ${error.message}`
    );

    throw error;
  }
};
