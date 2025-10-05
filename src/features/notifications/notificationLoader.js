// src/features/notifications/notificationLoader.js
import axios from "axios";
import { setNotifications } from "./notificationSlice"; // your slice actions

export async function notificationLoader(store) {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/applications/notifications",
      {
        withCredentials: true,
      }
    );

    // Dispatch data to Redux store
    if (store) {
      store.dispatch(setNotifications(data));
    }

    return data; // still available for useLoaderData if needed
  } catch (error) {
    console.log("Failed to load notifications:", error?.message);
    return null;
  }
}
