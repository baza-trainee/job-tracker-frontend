import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook.ts";
import { fetchVacancies } from "../../../store/slices/vacanciesSlice.ts";

import VacancySection from "./VacancySection.tsx";
import VacancyCard from "./VacancyCard.tsx";

const VacancyMain: FC = () => {
  const dispatch = useAppDispatch();
  const { vacancies, status } = useAppSelector((state) => state.vacancies);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVacancies());
    }
  }, [dispatch, status]);

  const getVacanciesByStatus = (statusName: string) =>
    vacancies.filter((vacancy) =>
      vacancy.statuses.some((status) => status.name === statusName)
    );

  const savedVacancies = getVacanciesByStatus("saved");
  // const sentVacancies = getVacanciesByStatus("resume");
  // const hrVacancies = getVacanciesByStatus("hr");
  // const testTaskVacancies = getVacanciesByStatus("test");
  // const techInterviewVacancies = getVacanciesByStatus("tech");
  // const rejectedVacancies = getVacanciesByStatus("reject");
  // const offerVacancies = getVacanciesByStatus("offer");

  return (
    <div className="w-full flex flex-col gap-6">
      <VacancySection
        titleSection="Збережені"
        colorSectionBorder="border-color5"
        colorSectionBG="bg-color5"
      >
        {savedVacancies.length > 0 ? (
          savedVacancies.map((vacancy) => (
            <VacancyCard 
              key={vacancy.id} 
              colorSectionBG="bg-color5-transparent" 
              titleVacancy={vacancy.vacancy} 
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))
        ): (<p>Немає збережених вакансій</p>)}
        {/* <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" workType="office" location="Kyiv" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Lviv" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Kyiv" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" workType="office" location="kharkiv" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Kyiv" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Poland" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Lviv" />
        <VacancyCard colorSectionBG="bg-color5-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Germany" /> */}
      </VacancySection>

      <VacancySection
        titleSection="Відправлені"
        colorSectionBorder="border-color1"
        colorSectionBG="bg-color1"
      >
        <VacancyCard colorSectionBG="bg-color1-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Kyiv" />
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
