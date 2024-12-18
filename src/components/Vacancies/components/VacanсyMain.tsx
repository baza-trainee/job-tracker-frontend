import { FC, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook.ts";
import {
  Vacancy,
  fetchVacancies,
} from "../../../store/slices/vacanciesSlice/vacanciesSlice.ts";

import VacancySection from "./VacancySection.tsx";
import VacancyCard from "./VacancyCard.tsx";
import { selectVacancies } from "../../../store/slices/vacanciesSlice/vacanciesSelector.ts";
import { VacancyProps } from "./VacanсyHeader.tsx";

const VacancyMain: FC<VacancyProps> = ({ isArchive }) => {
  const dispatch = useAppDispatch();
  const { filteredVacancies, status, sortType } =
    useAppSelector(selectVacancies);

  //вакансії які будуть відмальовуватися на картках
  let renderedVacancies: Vacancy[] = [];

  //визначаємо які саме вакансії архівні чи ні потрібно відмалювати, в залежності від сторінки, пропс isArchive вказує на це
  if (isArchive) {
    renderedVacancies = filteredVacancies.filter((v) => v.isArchived === true);
  } else {
    renderedVacancies = filteredVacancies.filter((v) => v.isArchived === false);
  }

  // визначаємо як повинна виглядати секція в залежності від наявності сортування за статусом, чи рендеру архівної сторінки
  const validStatuses = [
    "saved",
    "resume",
    "hr",
    "test",
    "tech",
    "reject",
    "offer",
  ];
  const isStatus = validStatuses.includes(sortType);
  //пропс для секцій, якщо він true то секція має виглядати без скрола и стрілок
  const isSorting = isStatus || isArchive;
  console.log("isSorting", isSorting);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVacancies());
    }
  }, [dispatch, status]);

  console.log("filteredVacancies", filteredVacancies);

  //тепер використовуємо для рендеру секцій renderedVacancies замість filteredVacancies
  const getVacanciesByStatus = (statusName: string) =>
    renderedVacancies.filter(
      (v) => v.statuses[v.statuses.length - 1].name === statusName
    );

  const savedVacancies = useMemo(
    () => getVacanciesByStatus("saved"),
    [filteredVacancies]
  );
  const resumeVacancies = useMemo(
    () => getVacanciesByStatus("resume"),
    [filteredVacancies]
  );
  const hrVacancies = useMemo(
    () => getVacanciesByStatus("hr"),
    [filteredVacancies]
  );
  const testVacancies = useMemo(
    () => getVacanciesByStatus("test"),
    [filteredVacancies]
  );
  const techVacancies = useMemo(
    () => getVacanciesByStatus("tech"),
    [filteredVacancies]
  );
  const rejectVacancies = useMemo(
    () => getVacanciesByStatus("reject"),
    [filteredVacancies]
  );
  const offerVacancies = useMemo(
    () => getVacanciesByStatus("offer"),
    [filteredVacancies]
  );

  return (
    <div className="flex w-full flex-col gap-6">
      {/* секція з архівними вакансіями, повинна мати вигляд такий самий, як секція при сортуванні за статусом; пропс isSorting визначає вигляд секцій, потрібно додати сірий колір в конфіг */}
      {isArchive && renderedVacancies.length > 0 && (
        <VacancySection
          titleSection="Архів"
          colorSectionBorder="[#DBDCDD]"
          colorSectionBG="[#DBDCDD]"
        >
          {savedVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="[#DBDCDD]"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))}
        </VacancySection>
      )}
      {!isArchive && savedVacancies.length > 0 && (
        <VacancySection
          titleSection="Збережені"
          colorSectionBorder="border-color5"
          colorSectionBG="bg-color5"
        >
          {savedVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color5-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))}
        </VacancySection>
      )}

      {/* <VacancySection
        titleSection="Збережені"
        colorSectionBorder="border-color5"
        colorSectionBG="bg-color5"
      >
        {status === "loading" ? (
          <p>Loading...</p>
        ) :
        savedVacancies.length > 0 ? (
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
      </VacancySection> */}

      {resumeVacancies.length > 0 && (
        <VacancySection
          titleSection="Відправлені"
          colorSectionBorder="border-color1"
          colorSectionBG="bg-color1"
        >
          {resumeVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color1-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))}
        </VacancySection>
      )}

      {/* <VacancySection
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
      </VacancySection> */}

      {hrVacancies.length > 0 && (
        <VacancySection
          titleSection="HR"
          colorSectionBorder="border-color4"
          colorSectionBG="bg-color4"
        >
          {hrVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color4-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))}
        </VacancySection>
      )}

      {/* <VacancySection
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
      </VacancySection> */}

      {testVacancies.length > 0 && (
        <VacancySection
          titleSection="Тестове завдання"
          colorSectionBorder="border-color3"
          colorSectionBG="bg-color3"
        >
          {testVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color3-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))}
        </VacancySection>
      )}

      {/* <VacancySection
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
      </VacancySection> */}

      {techVacancies.length > 0 && (
        <VacancySection
          titleSection="Технічна співбесіда"
          colorSectionBorder="border-color6"
          colorSectionBG="bg-color6"
        >
          {techVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color6-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))}
        </VacancySection>
      )}

      {/* <VacancySection
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
      </VacancySection> */}

      {/* {rejectVacancies.length > 0 && ( */}
      {rejectVacancies.length >= 0 && (
        <VacancySection
          titleSection="Технічна співбесіда"
          colorSectionBorder="border-color2"
          colorSectionBG="bg-color2"
        >
          {/* {rejectVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color2-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))} */}
          <VacancyCard
            colorSectionBG="bg-color2-transparent"
            titleVacancy="Junior FrontEnd"
            company="Ajax Systems"
            workType="office"
            location="Kyiv"
          />
          <VacancyCard
            colorSectionBG="bg-color2-transparent"
            titleVacancy="QA Engineer"
            company="Ajax Systems"
            workType="hybrid"
            location="Lviv"
          />
        </VacancySection>
      )}

      {/* <VacancySection
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
        <VacancyCard colorSectionBG="bg-color2-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" workType="office" location="Kyiv" />
        <VacancyCard colorSectionBG="bg-color2-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Lviv" />
      </VacancySection> */}

      {/* {offerVacancies.length > 0 && ( */}
      {offerVacancies.length >= 0 && (
        <VacancySection
          titleSection="Офер"
          colorSectionBorder="border-color7"
          colorSectionBG="bg-color7"
        >
          {/* {offerVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color7-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
            />
          ))} */}
          <VacancyCard
            colorSectionBG="bg-color7-transparent"
            titleVacancy="Junior FrontEnd"
            company="Ajax Systems"
            workType="office"
            location="Kyiv"
          />
          <VacancyCard
            colorSectionBG="bg-color7-transparent"
            titleVacancy="Junior FrontEnd"
            company="Ajax Systems"
            workType="office"
            location="kharkiv"
          />
          <VacancyCard
            colorSectionBG="bg-color7-transparent"
            titleVacancy="QA Engineer"
            company="Ajax Systems"
            workType="hybrid"
            location="Lviv"
          />
          <VacancyCard
            colorSectionBG="bg-color7-transparent"
            titleVacancy="Junior UX/Ui designer"
            company="DUDECODE"
            workType="remote"
            location="Kyiv"
          />
          <VacancyCard
            colorSectionBG="bg-color7-transparent"
            titleVacancy="QA Engineer"
            company="Ajax Systems"
            workType="hybrid"
            location="Kyiv"
          />
          <VacancyCard
            colorSectionBG="bg-color7-transparent"
            titleVacancy="Junior UX/Ui designer"
            company="DUDECODE"
            workType="remote"
            location="Poland"
          />
          {/* <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Lviv" /> */}
          {/* <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Germany" /> */}
          {/* <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="SENSE" workType="remote" location="Kyiv" /> */}
        </VacancySection>
      )}

      {/* <VacancySection
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
        <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" workType="office" location="Kyiv" />
        <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" workType="office" location="kharkiv" />
        <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Lviv" />
        <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Kyiv" />
        <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Kyiv" />
        <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Poland" />
        <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Lviv" />
        <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Germany" />
        <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="SENSE" workType="remote" location="Kyiv" />
      </VacancySection> */}
    </div>
  );
};

export default VacancyMain;
