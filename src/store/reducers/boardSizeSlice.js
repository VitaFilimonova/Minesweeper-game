import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: 8,
  columns: 8,
  minesNumber: 10,
  mode: "easy",
};

export const boardSizeSlice = createSlice({
  name: "boardSize",
  initialState,
  reducers: {
    updateBoard: (state, action) => {
      state.rows = action.payload.rows;
      state.columns = action.payload.columns;
      state.minesNumber = action.payload.minesNumber;
      state.mode = action.payload.mode;
    },
  },
});
export const { updateBoard } = boardSizeSlice.actions;
