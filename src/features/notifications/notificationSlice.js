// src/features/notification/notificationSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/applications/notifications",
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notifications"
      );
    }
  }
);

// ✅ Async thunk to mark a single notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (applicationId, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/applications/notifications/mark-read/${applicationId}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.application; // return the updated application info
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to mark notification as read"
      );
    }
  }
);

const initialState = {
  notifications: [], // stores all notifications
  stats: {
    total: 0,
    accepted: 0,
    rejected: 0,
    new: 0,
  },
  count: 0,
  success: false,
  message: "",
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      //   console.log(action);
      const { notifications, stats, count, success, message } = action.payload;
      state.notifications = notifications;
      state.stats = stats;
      state.count = count;
      state.success = success;
      state.message = message;
      //   state.loading = false;
      //   state.error = null;
    },
    addNotification: (state, action) => {
      // add new notification on top
      state.notifications.unshift(action.payload);
      state.stats.total += 1;
      if (action.payload.status === "accepted") state.stats.accepted += 1;
      if (action.payload.status === "rejected") state.stats.rejected += 1;
      if (action.payload.isNew) state.stats.new += 1;
    },
    markNotificationRead: (state, action) => {
      const id = action.payload;
      const notification = state.notifications.find((n) => n._id === id);
      if (notification && notification.isNew) {
        notification.isNew = false;
        state.stats.new = Math.max(0, state.stats.new - 1);
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.stats = { total: 0, accepted: 0, rejected: 0, new: 0 };
      state.count = 0;
      state.success = false;
      state.message = "";
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        const { notifications, stats, count, success, message } =
          action.payload;
        state.notifications = notifications;
        state.stats = stats;
        state.count = count;
        state.success = success;
        state.message = message;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) // ✅ New: handle markNotificationAsRead
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const { _id } = action.payload;

        // Remove the notification from Redux state
        state.notifications = state.notifications.filter((n) => n._id !== _id);

        // Optionally, update stats and count
        state.count = state.notifications.length;
        if (state.stats?.new) state.stats.new -= 1;
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setNotifications,
  addNotification,
  markNotificationRead,
  clearNotifications,
  setLoading,
  setError,
} = notificationSlice.actions;

export default notificationSlice.reducer;
