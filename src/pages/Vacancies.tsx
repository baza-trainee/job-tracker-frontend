import { FC } from "react";
import VacancyHeader from "../components/Vacancies/components/VacanсyHeader.tsx";
import VacancyMain from "../components/Vacancies/components/VacanсyMain.tsx";

const Vacancies: FC = () => {
  return (
    <div className="container pt-10 pb-8">
      <div className="m-auto flex w-[1308px] flex-col">
        <VacancyHeader isArchive={false} />
        <VacancyMain isArchive={false} />
      </div>
    </div>
  );
};

export default Vacancies;
