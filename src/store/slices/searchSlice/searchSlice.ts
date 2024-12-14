import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISearchState {
  searchQuery: string;
}

const searchInitialState: ISearchState = {
  searchQuery: "",
};

const searchSlice = createSlice({
  name: "Search",
  initialState: searchInitialState,
  reducers: {
    setQuery: (state, action: PayloadAction<ISearchState>) => {
      state.searchQuery = action.payload.searchQuery;
    },
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
