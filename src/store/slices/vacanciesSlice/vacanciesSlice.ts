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
  isArchive: boolean;
  createdAt: string;
  updatedAt: string;
  statuses: Status[];
}

interface VacanciesState {
  vacancies: Vacancy[];
  filteredVacancies: Vacancy[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: VacanciesState = {
  vacancies: [],
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
    console.log("Вакансії з бекенду:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    return rejectWithValue(
      error instanceof Error ? error.message : "Не вдалося отримати вакансії"
    );
  }
});

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    filterVacancies(state, action: PayloadAction<string>) {
      const query = action.payload.toLowerCase();
      if (query) {
        state.filteredVacancies = state.vacancies.filter(
          (v) =>
            v.company.toLowerCase().includes(query) ||
            v.vacancy.toLowerCase().includes(query)
        );
      } else {
        state.filteredVacancies = state.vacancies;
      }
    },
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
        state.error = action.payload ?? "Помилка під час отримання вакансій";
      });
  },
});

export const { filterVacancies } = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
