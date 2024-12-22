import VacancyHeader from "../Vacancies/components/VacanсyHeader";
import VacancyMain from "../Vacancies/components/VacanсyMain";

function Archive() {
  return (
    // <div className="flex w-full flex-col px-6 py-10">
    <div className="w-full px-6 py-10">
      <div className="m-auto flex w-[1308px] flex-col">
        <VacancyHeader isArchive={true} />
        <VacancyMain isArchive={true} />
      </div>
    </div>
  );
}

export default Archive;
