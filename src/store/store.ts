import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { profileQuerySlice } from "./slices/profileQuerySlice/profileQuerySlice.ts";
import { vacanciesQuerySlice } from "./slices/vacanciesQuerySlice/vacanciesQuerySlice.ts";
import vacanciesReducer from "./slices/vacanciesSlice/vacanciesSlice.ts";
import modalReduser from "./slices/modalSlice/modalSlice.ts";
import authReduser from "./slices/authSlice/authSlice.ts";
import themeReducer from "./slices/themeSlice/themeSlice.ts";
import sidebarReducer from "./slices/sibebarSlice/sidebarSlice.ts";

import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { resumesQuerySlices } from "./slices/resumesQuerySlices/resumesQuerySlices.ts";
import { projectQuerySlice } from "./slices/projectsQuerySlice/projectQuerySlice.ts";
import { coverLetterQuerySlice } from "./slices/coverLettersQuerySlice/coverLettersQuerySlice.ts";
import { notesQuerySlice } from "./slices/notesQuerySlice/nitesQuerySlice.ts";
import { eventQuerySlice } from "./slices/eventsQuerySlice/eventsQuerySlice.ts";
import { predictionsQuerySlice } from "./slices/predictionsQuerySlice/predictionsQuerySlice.ts";

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
    [profileQuerySlice.reducerPath]: profileQuerySlice.reducer,
    [vacanciesQuerySlice.reducerPath]: vacanciesQuerySlice.reducer,
    [resumesQuerySlices.reducerPath]: resumesQuerySlices.reducer,
    [projectQuerySlice.reducerPath]: projectQuerySlice.reducer,
    [coverLetterQuerySlice.reducerPath]: coverLetterQuerySlice.reducer,
    [notesQuerySlice.reducerPath]: notesQuerySlice.reducer,
    [eventQuerySlice.reducerPath]: eventQuerySlice.reducer,
    [predictionsQuerySlice.reducerPath]: predictionsQuerySlice.reducer,
    vacancies: vacanciesReducer,
    modal: modalReduser,
    auth: authPersistedReducer,
    theme: themePersistedReducer,
    sidebar: sidebarPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      //  {
      //   ignoredActions: [
      //     "modal/openModal",
      //     "modal/closeModal",
      //     FLUSH,
      //     REHYDRATE,
      //     PAUSE,
      //     PERSIST,
      //     PURGE,
      //     REGISTER,
      //   ],
      //   ignoredActionPaths: ["payload.modalContent"],
      //   ignoredPaths: ["modal.modalContent", "modal.onCallFunction"],
      // },
    }).concat(
      profileQuerySlice.middleware,
      vacanciesQuerySlice.middleware,
      resumesQuerySlices.middleware,
      projectQuerySlice.middleware,
      coverLetterQuerySlice.middleware,
      notesQuerySlice.middleware,
      eventQuerySlice.middleware,
      predictionsQuerySlice.middleware
    ),
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
