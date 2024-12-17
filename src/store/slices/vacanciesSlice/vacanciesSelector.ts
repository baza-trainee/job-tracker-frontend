import { RootState } from "../../store";

export const selectVacancies = (state: RootState) => state.vacancies;
export const selectSearchQuery = (state: RootState) =>
  state.vacancies.searchQuery;
export const selectSortType = (state: RootState) => state.vacancies.sortType;
export const selectVacanciesQuantity = (state: RootState) =>
  state.vacancies.filteredVacancies.length;
