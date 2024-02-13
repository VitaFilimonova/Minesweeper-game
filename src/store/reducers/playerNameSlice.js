import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerName: localStorage.getItem("playerName") || "anonymous",
  error: "",
};

// Check whether the player’s name is already set in localStorage, if not, set it to “anonymous”
if (!localStorage.getItem("playerName")) {
  localStorage.setItem("playerName", "anonymous");
}
export const playerNameSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.playerName = action.payload.playerName.trim();
      localStorage.setItem("playerName", state.playerName);
    },
  },
});
export const { updateName } = playerNameSlice.actions;
