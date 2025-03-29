import NoVacancyCard from "@/components/Statistics/componets/statisticsPanel/NoVacancyCard";
import { useGetAllUserDataQuery } from "@/store/querySlices/profileQuerySlice";

const NotesMain = () => {
  const { data, isLoading, isError } = useGetAllUserDataQuery();

  const notes = data?.notes || [];
  console.log("notes", notes);

  return (
    <div className="flex w-full flex-col gap-6">
      {isError && <h2>Error...</h2>}

      {!isLoading && notes.length === 0 && <NoVacancyCard />}
    </div>
  );
};

export default NotesMain;
