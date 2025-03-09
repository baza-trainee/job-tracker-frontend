import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { profileQuerySlice } from "./querySlices/profileQuerySlice.ts";
import { vacanciesQuerySlice } from "./querySlices/vacanciesQuerySlice.ts";
import filteredVacanciesReducer from "./slices/filteredVacanciesSlice/filteredVacanciesSlice.ts";
import modalReduser from "./slices/modalSlice/modalSlice.ts";
import authReduser from "./slices/authSlice/authSlice.ts";
import themeReducer from "./slices/themeSlice/themeSlice.ts";
import sidebarReducer from "./slices/sidebarSlice/sidebarSlice.ts";
import statusVacancyReducer from "./slices/statusVacancy/vacancyStatusSlice.ts";
import calendarReducer from "./slices/calendarSlice/calendarSlice.ts";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { resumesQuerySlices } from "./querySlices/resumesQuerySlices.ts";
import { projectQuerySlice } from "./querySlices/projectQuerySlice.ts";
import { coverLetterQuerySlice } from "./querySlices/coverLettersQuerySlice.ts";
import { notesQuerySlice } from "./querySlices/notesQuerySlice.ts";
import { eventQuerySlice } from "./querySlices/eventsQuerySlice.ts";
import { predictionsQuerySlice } from "./querySlices/predictionsQuerySlice.ts";
import {
  authPrivateQuerySlice,
  authPublicQuerySlice,
} from "./querySlices/authQuerySlice.ts";
import searchReducer from "./slices/searchSlice/searchSlice.ts";

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
    [authPrivateQuerySlice.reducerPath]: authPrivateQuerySlice.reducer,
    [authPublicQuerySlice.reducerPath]: authPublicQuerySlice.reducer,
    filteredVacancies: filteredVacanciesReducer,
    modal: modalReduser,
    auth: authPersistedReducer,
    theme: themePersistedReducer,
    sidebar: sidebarPersistedReducer,
    search: searchReducer,
    statusVacancy: statusVacancyReducer,
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      profileQuerySlice.middleware,
      vacanciesQuerySlice.middleware,
      resumesQuerySlices.middleware,
      projectQuerySlice.middleware,
      coverLetterQuerySlice.middleware,
      notesQuerySlice.middleware,
      eventQuerySlice.middleware,
      predictionsQuerySlice.middleware,
      authPrivateQuerySlice.middleware,
      authPublicQuerySlice.middleware
    ),
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
