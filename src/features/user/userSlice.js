import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import toast from "daisyui/components/toast";

// Load from localStorage if available
const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: storedUser,
  isAuthenticated: !!storedUser, // true if user exists
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // save to localStorage
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // remove from localStorage
      toast.success("Logged out successfully");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
