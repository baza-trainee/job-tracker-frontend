import NoVacancyCard from "@/components/Statistics/componets/statisticsPanel/NoVacancyCard";
import VacancyHeader from "@/components/Vacancies/components/VacanсyHeader";

function Notes() {
  return (
    <div className="container w-full pb-5 pt-4 sm:pb-6 sm:pt-4 md:py-6 xl:py-10">
      <VacancyHeader isArchive={true} />
      <NoVacancyCard />
    </div>
  );
}

export default Notes;
