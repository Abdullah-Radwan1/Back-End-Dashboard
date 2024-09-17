import { createSlice } from "@reduxjs/toolkit";

const initialState: { mode: string; userId: string } = {
 mode: "dark",
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
