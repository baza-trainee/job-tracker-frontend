import { FC } from "react";
import VacancyHeader from "./components/VacanсyHeader.tsx";
import VacancyMain from "./components/VacanсyMain.tsx";

const Vacancies: FC = () => {
  return (
    <div className="w-full px-6 py-10">
      <div className="w-[1308px] flex flex-col m-auto">
        <VacancyHeader isArchive={false} />

        <VacancyMain />
      </div>

    </div>
  );
};

export default Vacancies;
