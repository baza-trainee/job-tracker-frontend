import { configureStore } from "@reduxjs/toolkit";
import vacanciesReducer from "./slices/vacanciesSlice/vacanciesSlice.ts";
import modalReduser from "./slices/modalSlice/modalSlice.ts";
import authReduser from "./slices/authSlice/authSlice.ts";
import themeReducer from "./slices/themeSlice/themeSlice.ts";
import sidebarReducer from "./slices/sibebarSlice/sidebarSlice.ts";
import searchReduser from "./slices/searchSlice/searchSlice.ts";
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

const themePersistConfig = {
  key: "theme",
  storage,
};

const sidebarPersistConfig = {
  key: "sidebar",
  storage,
};

const authPersistedReducer = persistReducer(authPersistConfig, authReduser);
const themePersistedReducer = persistReducer(themePersistConfig, themeReducer);
const sidebarPersistedReducer = persistReducer(
  sidebarPersistConfig,
  sidebarReducer
);

export const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
    modal: modalReduser,
    auth: authPersistedReducer,
    theme: themePersistedReducer,
    sidebar: sidebarPersistedReducer,
    search: searchReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "modal/openModal",
          "modal/closeModal",
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
        ignoredActionPaths: ["payload.modalContent"],
        ignoredPaths: ["modal.modalContent", "modal.onCallFunction"],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
