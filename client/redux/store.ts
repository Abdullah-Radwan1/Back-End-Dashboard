import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./modeSlice/modeSlice";
import { api } from "./API/api";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
 reducer: {
  modeSlice: modeSlice,
  [api.reducerPath]: api.reducer,
 },
 middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);
export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
