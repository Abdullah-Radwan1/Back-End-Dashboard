import { createSlice } from "@reduxjs/toolkit";

// Define the mode type as a union of string literals
type Mode = "light" | "dark";

const initialState: { mode: Mode; userId: string } = {
 mode: "light",
 userId: "63701cc1f03239b7f700000e",
};

const modeSlice = createSlice({
 name: "SideBarSlice",
 initialState,
 reducers: {
  toggleMode: (state) => {
   state.mode = state.mode === "light" ? "dark" : "light";
  },
 },
});

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;
