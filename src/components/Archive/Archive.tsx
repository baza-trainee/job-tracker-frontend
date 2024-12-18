import VacancyHeader from "../Vacancies/components/VacanсyHeader";
import VacancyMain from "../Vacancies/components/VacanсyMain";

function Archive() {
  return (
    <div className="flex w-full flex-col px-6 py-10">
      <VacancyHeader isArchive={true} />
      <VacancyMain isArchive={true} />
    </div>
  );
}

export default Archive;
