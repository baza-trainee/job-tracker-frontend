import { FC } from "react";
import VacancyHeader from "./components/VacanсyHeader.tsx";
import VacancyMain from "./components/VacanсyMain.tsx";

const Vacancies: FC = () => {
  return (
    <div className="flex w-full flex-col px-6 py-10">
      <VacancyHeader isArchive={false} />

      <VacancyMain />
    </div>
  );
};

export default Vacancies;
