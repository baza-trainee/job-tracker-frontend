import VacancyHeader from "../components/Vacancies/components/VacanсyHeader";
import VacancyMain from "../components/Vacancies/components/VacanсyMain";

function Archive() {
  return (
    <div className="container pt-10 pb-8">
      <div className="m-auto flex w-[1308px] flex-col">
        <VacancyHeader isArchive={true} />
        <VacancyMain isArchive={true} />
      </div>
    </div>
  );
}

export default Archive;
