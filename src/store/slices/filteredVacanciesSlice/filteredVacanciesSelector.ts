import { RootState } from "../../store";

export const selectfilteredVacancies = (state: RootState) =>
  state.filteredVacancies;
export const selectSearchQuery = (state: RootState) =>
  state.filteredVacancies.searchQuery;
export const selectSortType = (state: RootState) =>
  state.filteredVacancies.sortType;
export const selectVacanciesQuantity = (state: RootState) =>
  state.filteredVacancies.filteredVacancies.length;
