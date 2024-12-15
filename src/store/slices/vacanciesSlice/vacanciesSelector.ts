import { RootState } from "../../store";

export const selectVacancies = (state: RootState) => state.vacancies;
export const selectVacanciesQuantity = (state: RootState) =>
  state.vacancies.filteredVacancies.length;
