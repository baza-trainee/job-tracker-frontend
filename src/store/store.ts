import { configureStore } from "@reduxjs/toolkit";
import exampleReduser from "./slices/exampleSlice.ts";
import modalReduser from "./slices/modalSlice/modalSlice.ts";
import authReduser from "./slices/authSlice/authSlice.ts";

export const store = configureStore({
  reducer: {
    example: exampleReduser,
    modal: modalReduser,
    auth: authReduser,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
