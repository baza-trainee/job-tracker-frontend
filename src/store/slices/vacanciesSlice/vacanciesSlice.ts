import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axios.ts";

interface Status {
  id: string;
  name: "saved" | "resume" | "hr" | "test" | "tech" | "reject" | "offer";
  date: string;
  rejectReason: string | null;
  resume: string | null;
}

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

interface VacanciesState {
  vacancies: Vacancy[];
  filteredVacancies: Vacancy[];
  searchQuery: string;
  sortType: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: VacanciesState = {
  vacancies: [],
  searchQuery: "",
  sortType: "",
  filteredVacancies: [],
  status: "idle",
  error: null,
};

export const fetchVacancies = createAsyncThunk<
  Vacancy[],
  void,
  { rejectValue: string }
>("vacancies/fetchVacancies", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<Vacancy[]>("/vacancies");
    // console.log("Response fetchVacancies status:", response.status);
    console.log("Vacancies from backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    return rejectWithValue(
      error instanceof Error ? error.message : "Unable to get vacancies"
    );
  }
});

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload.toLowerCase();
      // vacanciesSlice.caseReducers.applyFiltersAndSorting(state);
    },
    setSortType(state, action: PayloadAction<string>) {
      state.sortType = action.payload;
      // vacanciesSlice.caseReducers.applyFiltersAndSorting(state);
    },
    setFilteredVacancies(state, action: PayloadAction<Vacancy[]>) {
      state.filteredVacancies = action.payload;
      // vacanciesSlice.caseReducers.applyFiltersAndSorting(state);
    },
    // applyFiltersAndSorting(state) {
    //   let result = [...state.vacancies];

    //   //Фільтрація за текстовим запитом
    //   if (state.searchQuery) {
    //     result = result.filter(
    //       (v) =>
    //         v.company.toLowerCase().includes(state.searchQuery) ||
    //         v.vacancy.toLowerCase().includes(state.searchQuery) ||
    //         v.location.toLowerCase().includes(state.searchQuery)
    //     );
    //   }

    //   // Сортування / фільтрація за типом
    //   switch (state.sortType) {
    //     case "newFirst":
    //       result = result.sort(
    //         (a, b) =>
    //           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    //       );
    //       break;

    //     case "oldFirst":
    //       result = result.sort(
    //         (a, b) =>
    //           new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    //       );
    //       break;

    //     case "office":
    //     case "remote":
    //     case "hybrid":
    //       result = result.filter((v) => v.work_type === state.sortType);
    //       break;

    //     case "saved":
    //     case "resume":
    //     case "hr":
    //     case "test":
    //     case "tech":
    //     case "reject":
    //     case "offer":
    //       result = result.filter((v) => v.statuses[0].name === state.sortType);
    //       break;

    //     default:
    //       break;
    //   }

    //   state.filteredVacancies = result;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchVacancies.fulfilled,
        (state, action: PayloadAction<Vacancy[]>) => {
          state.status = "succeeded";
          state.vacancies = action.payload;
          state.filteredVacancies = action.payload;
        }
      )
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Error while getting vacancies";
      });
  },
});

export const { setSearchQuery, setSortType, setFilteredVacancies } =
  vacanciesSlice.actions;

export default vacanciesSlice.reducer;
