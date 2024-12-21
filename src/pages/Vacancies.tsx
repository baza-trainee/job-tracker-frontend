import { FC } from "react";
import VacancyHeader from "../components/Vacancies/components/VacanсyHeader.tsx";
import VacancyMain from "../components/Vacancies/components/VacanсyMain.tsx";

const Vacancies: FC = () => {
  return (
    <div className="w-full px-6 py-10">
      <div className="m-auto flex w-[1308px] flex-col">
        <VacancyHeader isArchive={false} />
        <VacancyMain isArchive={false} />
      </div>
    </div>
  );
};

export default Vacancies;
