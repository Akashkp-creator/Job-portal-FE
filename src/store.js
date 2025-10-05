import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
import jobReducer from "./features/jobs/jobSlice";
import notificationReducer from "./features/notifications/notificationSlice";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    jobState: jobReducer,
    notificationState: notificationReducer,
  },
});
