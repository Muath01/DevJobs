import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface jobSchema {
  jobTitle: String;
  type: String;
  company: String;
  location: String;
  remote: Boolean;
  salaryA: Number;
  salaryB: Number;
}

const initialState: jobSchema[] = [];

export const jobReducer = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      console.log("action: ", action.payload);

      return [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setJobs } = jobReducer.actions;

export default jobReducer.reducer;
