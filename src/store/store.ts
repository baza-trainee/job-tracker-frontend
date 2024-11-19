import { configureStore } from "@reduxjs/toolkit";
import exampleReduser from "./slices/exampleSlice.ts";
import modalReduser from "./slices/modalSlice/modalSlice.ts";

export const store = configureStore({
    reducer: {
        example: exampleReduser,
        modal: modalReduser,
    },
});

export default store;

// Визначення типів для кореневого стану та dispatch
export type RootState = ReturnType<typeof store.getState>; // тип для доступу до всього стану
export type AppDispatch = typeof store.dispatch; // тип для dispatch функції
