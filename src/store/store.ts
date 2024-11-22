import { configureStore } from "@reduxjs/toolkit";
import exampleReduser from "./slices/exampleSlice.ts";
import modalReduser from "./slices/modalSlice/modalSlice.ts";
import authReduser from "./slices/authSlice/authSlice.ts";
import themeReducer from "./slices/themeSlice/themeSlice.ts";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const themePersistConfig = {
  key: "theme",
  storage,
};

// const authPersistConfig = {
//   key: "auth",
//   storage,
// };

export const store = configureStore({
  reducer: {
    example: exampleReduser,
    modal: modalReduser,
    auth: authReduser,
    theme: persistReducer(themePersistConfig, themeReducer),
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
