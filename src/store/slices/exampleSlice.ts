import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// типізуємо стан (його значення, статус завантаження, помилка)
interface ExampleState {
    value: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

// почтакові значення параметрів стану, наповнюємо за потреби іншими параметрами
const initialState: ExampleState = {
    value: 0,
    status: "idle",
    error: null
};

// Типізуємо за потреби дані, що надсилаються на сервер
interface UserDataType {
    name: string;
    email: string;
    // Інші поля, що очікує сервер
}

// Типізуємо за потреби дані, що повертаються від сервера
interface ResponseDataType {
    id: number;
    name: string;
    email: string;
    // Інші поля, які повертає сервер
}

// Приклад простої асинхронної дії - Async thunk for a simple async action1
// exampleAsyncAction імітує запит, який очікує 1 секунду і повертає результат
export const exampleAsyncAction1 = createAsyncThunk<number, void>(
    "example/firstAsyncAction", // Унікальна назва для асинхронної дії ("назва слайсу/назва дії номер 1")
    async (_, { rejectWithValue }) => {  // _ параметр функції, тут може бути userdata, id, name, та ін.
        try {
            // Імітація асинхронної операції з затримкою 1 секунда
            const result = await new Promise<number>((resolve) => setTimeout(() => resolve(10), 1000));
            console.log("Async action succeeded:", result);
            return result;
        } catch (error) {
            // Обробка помилки, якщо щось пішло не так
            console.error("Async action failed");
            return rejectWithValue("Failed to fetch data"); // повернення повідомлення про помилку
        }
    }
);

// Приклад асинхронної дії з ЗАПИТОМ через axios - async thunk for request action2
// Вказуємо типи для createAsyncThunk<Тип_результату, Тип_аргументів>
export const exampleAsyncAction2 = createAsyncThunk<
    ResponseDataType, UserDataType, { rejectValue: string }
>(
    "example/firstAsyncAction2", // назва слайсу/назва дії номер 2
    async (userData: UserDataType, { rejectWithValue }) => {
        try {
            const response = await axios.post<ResponseDataType>("/api/endpoint", userData);
            console.log("response.data: ", response.data);
            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    }
);

// Створення слайсу з назвою, початковим станом та ред'юсерами
const exampleSlice = createSlice({
    name: "exampleName", // унікальне ім'я слайсу
    initialState, // початковий стан
    reducers: {
        // Приклад: Звичайний синхронний ред'юсер (проста дія), що збільшує значення на 1
        actionExample1: (state) => {
            state.value += 1; // оновлення значення стану
            console.log("Action Example 1: incremented value to", state.value);
        },
        // Приклад: Ред'юсер, що додає до значення в стані переданий параметр, і оновлює значення в стані
        actionExample2: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
            console.log("Action Example 2: added", action.payload, "to value, new value is", state.value);
        }
    },
    // extraReducers використовується для обробки результатів асинхронних дій exampleAsyncAction1, exampleAsyncAction2...
    extraReducers: (builder) => {
        builder
            // Додавання обробника для стану "pending" за потреби (завантаження розпочато)
            .addCase(exampleAsyncAction1.pending, (state) => {
                state.status = 'loading';
                console.log("Async action is loading...");
            })
            // Додавання обробника для стану "fulfilled" (успішне виконання)
            .addCase(exampleAsyncAction1.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value += action.payload;
                console.log("Async action fulfilled, value updated to:", state.value);
            })
            // Додавання обробника для стану "rejected" (помилка виконання)
            .addCase(exampleAsyncAction1.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string; // типізуємо повідомлення про помилку
                console.error("Async action failed with error:", state.error);
            })
            .addCase(exampleAsyncAction2.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload.id;
                console.log("Async action 2 fulfilled, value updated to:", state.value);
            })
            .addCase(exampleAsyncAction2.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string; // типізуємо повідомлення про помилку
                console.error("Async action 2 failed with error:", state.error);
            });
    }
});

// Експортуємо прості синхронні дії для використання в інших компонентах
export const { actionExample1, actionExample2 } = exampleSlice.actions;

// Експортуємо ред'юсер слайсу для додавання в store
export default exampleSlice.reducer;
