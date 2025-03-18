import { RootState } from "../../store";

export const selectSearchOpen = (state: RootState) => state.search.isSearchOpen;
export const selectDropdownShown = (state: RootState) =>
  state.search.isDropdownShown;
