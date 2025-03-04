import { createSlice } from "@reduxjs/toolkit";

interface ISearchState {
  isSearchOpen: boolean;
}

const initialState: ISearchState = {
  isSearchOpen: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openSearch: (state) => {
      state.isSearchOpen = true;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
  },
});

export const { openSearch, closeSearch, toggleSearch } = searchSlice.actions;
export default searchSlice.reducer;
