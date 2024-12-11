import { FC } from "react";
import VacancyHeader from "./components/VacanсyHeader.tsx";
import VacancyMain from "./components/VacanсyMain.tsx";

const Vacancies: FC = () => {
  return (
    <div className="w-full flex flex-col py-10 px-6">
      <VacancyHeader />

      <VacancyMain />
    </div>
  )
}

export default Vacancies;
