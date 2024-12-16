import { FC } from "react";
import VacancyHeader from "./components/VacanсyHeader.tsx";
import VacancyMain from "./components/VacanсyMain.tsx";

const Vacancies: FC = () => {
  return (
    <div className="w-full px-6 py-10 testdiv">
      <div className="w-[1300px] flex flex-col m-auto testinner">
        <VacancyHeader isArchive={false} />

        <VacancyMain />
      </div>

    </div>
  );
};

export default Vacancies;
