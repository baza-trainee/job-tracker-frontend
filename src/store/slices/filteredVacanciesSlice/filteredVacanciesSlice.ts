import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Status {
  id: string;
  name: "saved" | "resume" | "hr" | "test" | "tech" | "reject" | "offer";
  date: string;
  rejectReason: string | null;
  resume: string | null;
}
// vacancyId?: string;
// vacancy: Vacancy;
// name: StatusName;
// date: string;
// rejectReason?: RejectReason;
// resumeId?: string;
export interface Vacancy {
  id: string;
  vacancy: string;
  link: string;
  communication: string;
  company: string;
  location: string;
  work_type: "office" | "remote" | "hybrid";
  note: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  statuses: Status[];
}

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
