import PageHeader from "../components/commonComponents/PageHeader";
import VacancyMain from "../components/Vacancies/components/VacanсyMain";

function Archive() {
  return (
    <div className="container pb-5 pt-4 sm:pb-6 sm:pt-4 md:pb-6 md:pt-6 xl:pb-8 xl:pt-10">
      <div className="m-auto flex w-full flex-col md:w-[720px] xl:w-[1140px] 2xl:w-[1300px] 3xl:w-[1780px]">
        <PageHeader isArchive={true} />
        <VacancyMain isArchive={true} />
      </div>
    </div>
  );
}

export default Archive;
