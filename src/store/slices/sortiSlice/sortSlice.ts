import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SortState {
  type: string | null;
}

const initialState: SortState = {
  type: null, // Початковий стан (нічого не вибрано)
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortType(state, action: PayloadAction<string>) {
      state.type = action.payload; // Оновлюємо вибраний тип сортування
    },
  },
});

export const { setSortType } = sortSlice.actions;
export default sortSlice.reducer;
