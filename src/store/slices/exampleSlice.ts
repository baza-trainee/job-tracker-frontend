import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ExampleState {
    value: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ExampleState = {
    value: 0,
    status: "idle",
    error: null
};

interface UserDataType {
    name: string;
    email: string;
}

interface ResponseDataType {
    id: number;
    name: string;
    email: string;
}

export const exampleAsyncAction1 = createAsyncThunk<number, void>(
    "example/firstAsyncAction",
    async (_, { rejectWithValue }) => {
        try {
            const result = await new Promise<number>((resolve) => setTimeout(() => resolve(10), 1000));
            console.log("Async action succeeded:", result);
            return result;
        } catch (error) {
            console.error("Async action failed");
            return rejectWithValue("Failed to fetch data");
        }
    }
);

export const exampleAsyncAction2 = createAsyncThunk<
    ResponseDataType, UserDataType, { rejectValue: string }
>(
    "example/firstAsyncAction2",
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

const exampleSlice = createSlice({
    name: "exampleName", 
    initialState,
    reducers: {
        actionExample1: (state) => {
            state.value += 1; 
            console.log("Action Example 1: incremented value to", state.value);
        },
        actionExample2: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
            console.log("Action Example 2: added", action.payload, "to value, new value is", state.value);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(exampleAsyncAction1.pending, (state) => {
                state.status = 'loading';
                console.log("Async action is loading...");
            })
            .addCase(exampleAsyncAction1.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value += action.payload;
                console.log("Async action fulfilled, value updated to:", state.value);
            })
            .addCase(exampleAsyncAction1.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string; 
                console.error("Async action failed with error:", state.error);
            })
            .addCase(exampleAsyncAction2.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload.id;
                console.log("Async action 2 fulfilled, value updated to:", state.value);
            })
            .addCase(exampleAsyncAction2.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
                console.error("Async action 2 failed with error:", state.error);
            });
    }
});

export const { actionExample1, actionExample2 } = exampleSlice.actions;

export default exampleSlice.reducer;
