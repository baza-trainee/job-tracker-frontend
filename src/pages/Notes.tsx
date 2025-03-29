import NotesMain from "@/components/Notes/components/NotesMain";

import VacancyHeader from "@/components/Vacancies/components/VacanсyHeader";

function Notes() {
  return (
    <div className="container pb-5 pt-4 sm:pb-6 sm:pt-4 md:py-6 xl:py-10">
      <VacancyHeader isArchive={true} />
      <NotesMain />
    </div>
  );
}

export default Notes;
