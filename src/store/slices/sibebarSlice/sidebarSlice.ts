import { createSlice } from "@reduxjs/toolkit";

interface ISidebarState {
  isSidebarOpen: boolean;
}

const sidebarInitialState: ISidebarState = {
  isSidebarOpen: true,
};

const sidebarSlice = createSlice({
  name: "Sidebar",
  initialState: sidebarInitialState,
  reducers: {
    openSidebar: (state) => void (state.isSidebarOpen = true),
    closeSidebar: (state) => void (state.isSidebarOpen = false),
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
