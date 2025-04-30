import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "@/types/notes.types";

interface FilteredNotesState {
  filteredNotes: Note[];
  searchNotesQuery: string;
  sortNotesType: string;
}

const initialState: FilteredNotesState = {
  searchNotesQuery: "",
  sortNotesType: "",
  filteredNotes: [],
};

const filteredNotesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotesSearchQuery(state, action: PayloadAction<string>) {
      state.searchNotesQuery = action.payload.toLowerCase();
    },
    setNotesSortType(state, action: PayloadAction<string>) {
      state.sortNotesType = action.payload;
    },
    setFilteredNotes(state, action: PayloadAction<Note[]>) {
      state.filteredNotes = action.payload;
    },
  },
});

export const { setNotesSearchQuery, setNotesSortType, setFilteredNotes } =
  filteredNotesSlice.actions;

export default filteredNotesSlice.reducer;
