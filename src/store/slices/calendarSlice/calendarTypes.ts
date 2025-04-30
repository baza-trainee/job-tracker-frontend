export type CalendarTab = "day" | "month" | "year";

export interface CalendarState {
    selectedDate: Date;
    selectedMonth: Date;
    selectedYear: number;
    activeTab: CalendarTab;
}
