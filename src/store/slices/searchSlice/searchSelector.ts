import { RootState } from "../../store";

export const selectSearchOpen = (state: RootState) => state.search.isSearchOpen;
