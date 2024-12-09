import { FC} from "react";
import VacancySection from "./VacancySection.tsx";

const Vacancies: FC = () => {
  return (
    <div className="w-full px-6 pt-10 flex flex-col gap-6">
      <VacancySection 
        titleSection="Збережені"
        colorSectionBorder="border-color5"
        colorSectionBG="bg-color5"

      />
      <VacancySection 
        titleSection="Відправлені"
        colorSectionBorder="border-color1"
        colorSectionBG="bg-color1"
      />
      <VacancySection 
        titleSection="HR"
        colorSectionBorder="border-color4"
        colorSectionBG="bg-color4"
      />
      <VacancySection 
        titleSection="Тестове завдання"
        colorSectionBorder="border-[#FFF3CC]"
        colorSectionBG="bg-[#FFF3CC]"
      />
      <VacancySection 
        titleSection="Технічна співбесіда"
        colorSectionBorder="border-color6"
        colorSectionBG="bg-color6"
      />
      <VacancySection 
        titleSection="Відмова"
        colorSectionBorder="border-color2"
        colorSectionBG="bg-color2"
      />
      <VacancySection 
        titleSection="Офер"
        colorSectionBorder="border-color7"
        colorSectionBG="bg-color7"
      />
    </div>
  )
}

// function Vacancies() {
//   return (
//     <div className="flex w-full items-center justify-center">
//       <h2 className="text-2xl">Vacancies</h2>
//     </div>
//   );
// }

export default Vacancies;
