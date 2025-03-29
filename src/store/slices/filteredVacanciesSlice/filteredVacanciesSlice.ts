import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vacancy } from "../../../types/vacancies.types";

interface FilteredVacanciesState {
  filteredVacancies: Vacancy[];
  searchQuery: string;
  sortType: string;
}

const initialState: FilteredVacanciesState = {
  searchQuery: "",
  sortType: "",
  filteredVacancies: [],
};

const filteredVacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload.toLowerCase();
    },
    setSortType(state, action: PayloadAction<string>) {
      state.sortType = action.payload;
    },
    setFilteredVacancies(state, action: PayloadAction<Vacancy[]>) {
      state.filteredVacancies = action.payload;
    },
  },
});

export const { setSearchQuery, setSortType, setFilteredVacancies } =
  filteredVacanciesSlice.actions;

export default filteredVacanciesSlice.reducer;
