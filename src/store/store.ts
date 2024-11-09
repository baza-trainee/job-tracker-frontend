import { configureStore } from "@reduxjs/toolkit";
import exampleReduser from "./slices/exampleSlice.ts"; // іменуємо логічно редьюсер, бо в слайсі експорт дефолтний
// import userReduser from ".slices/userReduser.ts"; // ще приклад
import modalReduser from "./slices/modalSlice.ts";

// Створюємо store і додаємо ред'юсери
export const store = configureStore({
    reducer: {
        example: exampleReduser,
        // user: userReducer // ще приклад, додатковий ред'юсер
        modal: modalReduser,
    },
});

export default store;

// Визначення типів для кореневого стану та dispatch
export type RootState = ReturnType<typeof store.getState>; // тип для доступу до всього стану
export type AppDispatch = typeof store.dispatch; // тип для dispatch функції
