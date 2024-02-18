import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice.js";

export const makeStore = () => {
  return configureStore({
    reducer: { user },
  });
};
