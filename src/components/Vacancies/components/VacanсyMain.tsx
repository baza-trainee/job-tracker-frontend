import { FC } from "react";
import VacancySection from "./VacancySection.tsx";
import VacancyCard from "./VacancyCard.tsx";

const VacancyMain: FC = () => {

  return (
    <div className="w-full flex flex-col gap-6">
      <VacancySection
        titleSection="Збережені"
        colorSectionBorder="border-color5"
        colorSectionBG="bg-color5"
      >
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" locationType="office" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="QA Engineer" company="Ajax Systems" locationType="hybrid" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" locationType="remote" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" locationType="office" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="QA Engineer" company="Ajax Systems" locationType="hybrid" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" locationType="remote" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="QA Engineer" company="Ajax Systems" locationType="hybrid" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" locationType="remote" />
      </VacancySection>

      <VacancySection
        titleSection="Відправлені"
        colorSectionBorder="border-color1"
        colorSectionBG="bg-color1"
      >
        <VacancyCard colorSectionBG="bg-color1-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" locationType="remote" />
      </VacancySection>

      <VacancySection
        titleSection="HR"
        colorSectionBorder="border-color4"
        colorSectionBG="bg-color4"
      >
      </VacancySection>

      <VacancySection
        titleSection="Тестове завдання"
        colorSectionBorder="border-color3"
        colorSectionBG="bg-color3"
      >
      </VacancySection>

      <VacancySection
        titleSection="Технічна співбесіда"
        colorSectionBorder="border-color6"
        colorSectionBG="bg-color6"
      >
      </VacancySection>

      <VacancySection
        titleSection="Відмова"
        colorSectionBorder="border-color2"
        colorSectionBG="bg-color2"
      >
      </VacancySection>

      <VacancySection
        titleSection="Офер"
        colorSectionBorder="border-color7"
        colorSectionBG="bg-color7"
      >
      </VacancySection>
    </div>
  )
}

export default VacancyMain;
