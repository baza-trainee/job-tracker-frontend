import { FC } from "react";
import VacancyHeader from "../components/Vacancies/components/VacanсyHeader.tsx";
import VacancyMain from "../components/Vacancies/components/VacanсyMain.tsx";

const Vacancies: FC = () => {
  return (
    <div className="container pt-10 pb-8">
      {/* Виправити ширину для адаптивa на менше, ніж 1280!! */}
      <div className="m-auto flex w-[1148px] xl:w-[1148px] 2xl:w-[1308px] 3xl:w-[1788px] flex-col">
        <VacancyHeader isArchive={false} />
        <VacancyMain isArchive={false} />
      </div>
    </div>
  );
};

export default Vacancies;
