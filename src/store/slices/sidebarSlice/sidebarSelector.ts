import { RootState } from "../../store";

export const selectSidebar = (state: RootState) => state.sidebar.isSidebarOpen;
