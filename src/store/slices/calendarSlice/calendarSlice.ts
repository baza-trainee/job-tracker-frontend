import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarState, CalendarTab } from "./calendarTypes.ts";

const initialState: CalendarState = {
    selectedDate: new Date(),
    selectedMonth: new Date(),
    selectedYear: new Date().getFullYear(),
    activeTab: "day"
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setSelectedDate: (state, action: PayloadAction<Date>) => {
            state.selectedDate = action.payload;
            // console.log("слайс обрали день", state.selectedDate)
        },
        setSelectedMonth: (state, action: PayloadAction<Date>) => {
            state.selectedMonth = action.payload;
            // console.log("слайс обрали місяць", state.selectedMonth)
        },
        setSelectedYear: (state, action: PayloadAction<number>) => {
            state.selectedYear = action.payload;
            // console.log("слайс обрали рік", state.selectedYear)
        },
        setActiveTab: (state, action: PayloadAction<CalendarTab>) => {
            state.activeTab = action.payload
        }
    }
});

export const {
    setSelectedDate,
    setSelectedMonth,
    setSelectedYear,
    setActiveTab
} = calendarSlice.actions;

export default calendarSlice.reducer;
