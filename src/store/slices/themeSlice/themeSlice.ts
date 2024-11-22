import { createSlice } from "@reduxjs/toolkit";

interface IThemeState {
  darkMode: boolean;
}

const themeInitialState: IThemeState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    toggleTheme: (state) => void (state.darkMode = !state.darkMode),
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
