import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios.ts";

interface Status {
  id: string;
  name: "saved" | "resume" | "hr" | "test" | "tech" | "reject" | "offer";
  date: string;
  rejectReason: string | null;
  resume: string | null;
}

interface Vacancy {
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
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: VacanciesState = {
    vacancies: [],
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action: PayloadAction<Vacancy[]>) => {
        state.status = "succeeded";
        state.vacancies = action.payload;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Помилка під час отримання вакансій";
      });
  },
});

export default vacanciesSlice.reducer;