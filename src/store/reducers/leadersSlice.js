import { createSlice } from "@reduxjs/toolkit";

const savedLeaders = JSON.parse(localStorage.getItem("leaders"));

const initialState = {
  error: "",
  leaders: savedLeaders || {
    easy: [],
    normal: [],
    hard: [],
    custom: [],
  },
};
export const leadersSlice = createSlice({
  name: "leaders",
  initialState,
  reducers: {
    addLeaderResult: (state, action) => {
      const { mode, playerName, time } = action.payload;
      const newResult = { playerName, time };
      const results = state.leaders[mode];

      // Add a new result and sort by time
      state.leaders[mode] = [...results, newResult]
        .sort((a, b) => a.time - b.time)
        .slice(0, 10);
      localStorage.setItem("leaders", JSON.stringify(state.leaders));
    },
  },
});
export const { addLeaderResult } = leadersSlice.actions;
