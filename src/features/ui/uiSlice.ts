import { createSlice } from "@reduxjs/toolkit";
import type { ViewMode } from "../../shared/types/viewMode";

export type UiState = {
  mode: ViewMode;
};

const initialState: UiState = {
  mode: "admin",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMode(state, action: { payload: ViewMode }) {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = uiSlice.actions;
export default uiSlice.reducer;
