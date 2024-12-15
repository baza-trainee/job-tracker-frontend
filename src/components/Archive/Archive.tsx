import VacancyHeader from "../Vacancies/components/VacanсyHeader";

function Archive() {
  return (
    <div className="flex w-full flex-col px-6 py-10">
      <VacancyHeader isArchive={true} />
      <h2>Archive</h2>
    </div>
  );
}

export default Archive;
