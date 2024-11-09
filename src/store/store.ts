import { configureStore } from "@reduxjs/toolkit";
import exampleReduser from "./slices/exampleSlice.ts"; // іменуємо логічно редьюсер, бо в слайсі експорт дефолтний
import modalReduser from "./slices/modalSlice/modalSlice.ts";
// import userReduser from ".slices/userReduser.ts"; // ще приклад

// Створюємо store і додаємо ред'юсери
export const store = configureStore({
    reducer: {
        example: exampleReduser,
        modal: modalReduser,
        // user: userReducer // ще приклад, додатковий ред'юсер
    },
});

export default store;

// Визначення типів для кореневого стану та dispatch
export type RootState = ReturnType<typeof store.getState>; // тип для доступу до всього стану
export type AppDispatch = typeof store.dispatch; // тип для dispatch функції
