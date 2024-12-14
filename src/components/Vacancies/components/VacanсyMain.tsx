import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook.ts";
import { fetchVacancies } from "../../../store/slices/vacanciesSlice/vacanciesSlice.ts";

import VacancySection from "./VacancySection.tsx";
import VacancyCard from "./VacancyCard.tsx";
import { selectVacancies } from "../../../store/slices/vacanciesSlice/vacanciesSelector.ts";

const VacancyMain: FC = () => {
  const dispatch = useAppDispatch();
  const { filteredVacancies, status } = useAppSelector(selectVacancies);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVacancies());
    }
  }, [dispatch, status]);

  console.log("filteredVacancies", filteredVacancies);

  const getVacanciesByStatus = (statusName: string) =>
    filteredVacancies.filter((vacancy) =>
      vacancy.statuses.some((status) => status.name === statusName)
    );

  const savedVacancies = getVacanciesByStatus("saved");
  const resumeVacancies = getVacanciesByStatus("resume");
  const hrVacancies = getVacanciesByStatus("hr");
  const testVacancies = getVacanciesByStatus("test");
  const techVacancies = getVacanciesByStatus("tech");
  const rejectVacancies = getVacanciesByStatus("reject");
  const offerVacancies = getVacanciesByStatus("offer");

  return (
    <div className="flex w-full flex-col gap-6">
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
        ) : (
          <p>Немає збережених вакансій</p>
        )}
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
        {resumeVacancies.length > 0 ? (
          resumeVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color1-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))
        ) : (
          <p>Немає збережених вакансій</p>
        )}
        {/* <VacancyCard colorSectionBG="bg-color1-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Kyiv" /> */}
      </VacancySection>

      <VacancySection
        titleSection="HR"
        colorSectionBorder="border-color4"
        colorSectionBG="bg-color4"
      >
        {hrVacancies.length > 0 ? (
          hrVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color4-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))
        ) : (
          <p>Немає збережених вакансій</p>
        )}
      </VacancySection>

      <VacancySection
        titleSection="Тестове завдання"
        colorSectionBorder="border-color3"
        colorSectionBG="bg-color3"
      >
        {testVacancies.length > 0 ? (
          testVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color3-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))
        ) : (
          <p>Немає збережених вакансій</p>
        )}
      </VacancySection>

      <VacancySection
        titleSection="Технічна співбесіда"
        colorSectionBorder="border-color6"
        colorSectionBG="bg-color6"
      >
        {techVacancies.length > 0 ? (
          techVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color6-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))
        ) : (
          <p>Немає збережених вакансій</p>
        )}
      </VacancySection>

      <VacancySection
        titleSection="Відмова"
        colorSectionBorder="border-color2"
        colorSectionBG="bg-color2"
      >
        {rejectVacancies.length > 0 ? (
          rejectVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color2-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))
        ) : (
          <p>Немає збережених вакансій</p>
        )}
      </VacancySection>

      <VacancySection
        titleSection="Офер"
        colorSectionBorder="border-color7"
        colorSectionBG="bg-color7"
      >
        {offerVacancies.length > 0 ? (
          offerVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color7-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))
        ) : (
          <p>Немає збережених вакансій</p>
        )}
      </VacancySection>
    </div>
  );
};

export default VacancyMain;
