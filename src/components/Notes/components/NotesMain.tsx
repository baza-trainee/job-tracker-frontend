import NoVacancyCard from "@/components/Statistics/componets/statisticsPanel/NoVacancyCard";
import { useGetAllUserDataQuery } from "@/store/querySlices/profileQuerySlice";
import NoteCard from "./NoteCard";
import { useAppDispatch, useAppSelector, useFilteredNotes } from "@/store/hook";
import { selectfilteredNotes } from "@/store/slices/filteredNotesSlice/filteredNotesSelector";
import { setFilteredNotes } from "@/store/slices/filteredNotesSlice/filteredNotesSlice";
import { useEffect } from "react";

const NotesMain = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetAllUserDataQuery();
  const { sortNotesType, searchNotesQuery } =
    useAppSelector(selectfilteredNotes);

  const notes = data?.notes || [];
  console.log("notes", notes);

  const filteredNotes = useFilteredNotes(
    notes,
    searchNotesQuery,
    sortNotesType
  );

  useEffect(() => {
    dispatch(setFilteredNotes(filteredNotes));
  }, [sortNotesType, searchNotesQuery, dispatch]);

  return (
    <div className="flex w-full flex-col gap-6">
      {isError && <h2>Error...</h2>}

      {!isLoading && notes.length === 0 && <NoVacancyCard />}
      {filteredNotes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
};

export default NotesMain;
