import { configureStore } from "@reduxjs/toolkit";
import exampleReduser from "./slices/exampleSlice.ts";
import modalReduser from "./slices/modalSlice/modalSlice.ts";
import authReduser from "./slices/authSlice/authSlice.ts";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
};

const authPersistedReducer = persistReducer(authPersistConfig, authReduser);

export const store = configureStore({
  reducer: {
    example: exampleReduser,
    modal: modalReduser,
    auth: authPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
