import { RootState } from "../../store";

export const selectSearchQuery = (state: RootState) => state.search.searchQuery;
