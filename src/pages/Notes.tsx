import VacancyHeader from "@/components/Vacancies/components/VacanсyHeader";

function Notes() {
  return (
    <div className="flex w-full items-center justify-center">
      <VacancyHeader isArchive={false} />
      <h2>Notes</h2>
    </div>
  );
}

export default Notes;
