// src/features/job/jobSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  totalJobs: 0,
  companyInfo: "",
};
// console.log(initialState.jobs);
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      // console.log(action.payload);
      state.jobs = action.payload.jobs;
      state.companyInfo = action.payload.jobs[0].companyId;

      state.totalJobs = action.payload.totalJobs;
    },
    clearJobs: (state) => {
      state.jobs = [];
      state.totalJobs = 0;
    },
    removeJob: (state, action) => {
      const jobId = action.payload;
      state.jobs = state.jobs.filter((job) => job._id !== jobId);
      state.totalJobs = state.jobs.length;
    },
  },
});

export const { setJobs, clearJobs, removeJob } = jobSlice.actions;
export default jobSlice.reducer;
