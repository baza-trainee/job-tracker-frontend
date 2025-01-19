import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { vacancyStatusesProps } from "./vacancyStatusTypes";
import { statusActionProps } from "./vacancyStatusTypes";

const initialState: vacancyStatusesProps = {
  previousStatuses: [],
  newStatuses: [],
};

const vacancyStatusSlice = createSlice({
  name: "vacancyStatus",
  initialState,
  reducers: {
    createNewStatuses: (state, action) => {
      state.previousStatuses = action.payload;
      state.newStatuses = action.payload;
    },
    saveStatus: (state, action: PayloadAction<statusActionProps>) => {
      state.newStatuses.push(action.payload);
    },
    deleteStatus: (state, action: PayloadAction<statusActionProps>) => {
      state.newStatuses.filter((elem) => elem.id !== action.payload.id);
    },
    changeStatus: (state, action: PayloadAction<statusActionProps>) => {
      state.newStatuses = state.newStatuses.map(
        (elem) =>
          elem.id === action.payload.id ? { ...elem, ...action.payload } : elem
        // elem.name === action.payload.name ? { ...elem, ...action.payload } : elem
      );
    },
  },
});

export const { saveStatus, deleteStatus, changeStatus, createNewStatuses } =
  vacancyStatusSlice.actions;

export default vacancyStatusSlice.reducer;
