import VacancyHeader from "../components/Vacancies/components/VacanсyHeader";
import VacancyMain from "../components/Vacancies/components/VacanсyMain";

function Archive() {
  return (
    <div className="container pb-8 pt-10">
      <div className="m-auto flex w-full flex-col md:w-[728px] xl:w-[1148px] 2xl:w-[1308px] 3xl:w-[1788px]">
        <VacancyHeader isArchive={true} />
        <VacancyMain isArchive={true} />
      </div>
    </div>
  );
}

export default Archive;
