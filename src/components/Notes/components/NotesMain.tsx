import NoVacancyCard from "@/components/Statistics/componets/statisticsPanel/NoVacancyCard";
import { useGetAllUserDataQuery } from "@/store/querySlices/profileQuerySlice";
import NoteCard from "./NoteCard";
import { useAppDispatch, useAppSelector, useFilteredNotes } from "@/store/hook";
import { selectfilteredNotes } from "@/store/slices/filteredNotesSlice/filteredNotesSelector";
import { setFilteredNotes } from "@/store/slices/filteredNotesSlice/filteredNotesSlice";
import { useEffect } from "react";
import NoteCardSceleton from "./NoteCardSceleton";

const NotesMain = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetAllUserDataQuery();
  const { sortNotesType, searchNotesQuery } =
    useAppSelector(selectfilteredNotes);

  const notes = data?.notes || [];

  const filteredNotes = useFilteredNotes(
    notes,
    searchNotesQuery,
    sortNotesType
  );

  useEffect(() => {
    dispatch(setFilteredNotes(filteredNotes));
  }, [sortNotesType, searchNotesQuery, dispatch]);

  return (
    <div className="flex w-full justify-center">
      {isLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <NoteCardSceleton key={index} />
        ))}
      {isError && <h2>Error...</h2>}

      {!isLoading && !isError && notes.length === 0 && <NoVacancyCard />}
      {!isLoading && !isError && notes.length > 0 && (
        <div className="grid w-full justify-center gap-6 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesMain;
