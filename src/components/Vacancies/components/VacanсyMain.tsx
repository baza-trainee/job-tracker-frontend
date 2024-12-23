import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useAppDispatch,
  useAppSelector,
  useFilteredVacancies,
} from "../../../store/hook.ts";
import { setFilteredVacancies } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice.ts";
import { selectfilteredVacancies } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSelector.ts";
import { useGetAllUserDataQuery } from "../../../store/slices/profileQuerySlice/profileQuerySlice.ts";

import VacancySection from "./VacancySection.tsx";
import VacancySectionBox from "./VacancySectionBox.tsx";
import VacancyCard from "./VacancyCard.tsx";
import VacancyCardFirst from "./VacancyCardFirst.tsx";
import VacancySectionSkeleton from "./VacancySectionSceleton";

import { VacancyProps } from "./VacanсyHeader.tsx";
import {
  getLocalizedSectionConfig,
  getVacanciesByStatus,
} from "./VacancyMainConfig.ts";

const VacancyMain: FC<VacancyProps> = ({ isArchive }) => {
  const { sortType, searchQuery } = useAppSelector(selectfilteredVacancies);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const localizedSections = getLocalizedSectionConfig();

  const { data, isLoading, isError } = useGetAllUserDataQuery();

  const vacancies = data?.vacancies || [];
  const filteredVacancies = useFilteredVacancies(
    vacancies,
    searchQuery,
    sortType
  );

  // Логіка рендерингу вакансій
  const isStatus = [
    "saved",
    "resume",
    "hr",
    "test",
    "tech",
    "reject",
    "offer",
  ].includes(sortType);
  const isSorting = isStatus || isArchive;

  const renderedVacancies = isArchive
    ? filteredVacancies.filter((v) => v.isArchived === true)
    : filteredVacancies.filter((v) => v.isArchived === false);

  //oновлюємо кількість відфільтрованих вакансій
  useEffect(() => {
    dispatch(setFilteredVacancies(renderedVacancies));
  }, [searchQuery, sortType, dispatch]);

  return (
    <div className="test-watch flex w-full flex-col gap-6">
      {/* Показ скелетону під час завантаження */}
      {isLoading && <VacancySectionSkeleton />}
      {isError && <h2>Error...</h2>}
      {/* Заглушка "картка Створити", якщо взагалі вакансій немає */}
      {!isLoading && vacancies.length === 0 && (
        <VacancySection
          titleSection="Збережені"
          colorSectionBorder="border-color5"
          colorSectionBG="bg-color5"
        >
          <VacancyCardFirst
            colorSectionBG="bg-color5-transparent"
            colorHoverBG="hover:bg-color5"
          />
        </VacancySection>
      )}
      {/* Архівні вакансії */}
      {isArchive && renderedVacancies.length > 0 && (
        <VacancySectionBox
          titleSection={t("vacanciesHeader.archive")}
          colorSectionBorder="border-color9"
          colorSectionBG="bg-color9"
        >
          {renderedVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              colorSectionBG="bg-color9-transparent"
              colorHoverBG="hover:bg-color9"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
              onClick={() => alert("Модалка для редагування картки")}
            />
          ))}
        </VacancySectionBox>
      )}
      {/* В цій секції не має вакансій... - під час сортування*/}
      {!isLoading && renderedVacancies.length === 0 && (
        <p className="mt-4 font-nunito text-xl">
          {t("vacanciesHeader.emptySection")}
        </p>
      )}

      {/* Секції активних вакансій */}
      {!isArchive &&
        localizedSections.map(
          (section) =>
            getVacanciesByStatus(renderedVacancies, section.sectionName)
              .length > 0 &&
            (!isSorting ? (
              <VacancySection
                key={section.sectionName}
                titleSection={section.title}
                colorSectionBorder={section.borderColor}
                colorSectionBG={section.backgroundColor}
              >
                {getVacanciesByStatus(
                  renderedVacancies,
                  section.sectionName
                ).map((vacancy) => (
                  <VacancyCard
                    key={vacancy.id}
                    colorSectionBG={section.backgroundTransparent}
                    colorHoverBG={section.hoverColor}
                    titleVacancy={vacancy.vacancy}
                    company={vacancy.company}
                    workType={vacancy.work_type}
                    location={vacancy.location}
                    onClick={() => alert("Модалка для редагування картки")}
                  />
                ))}
              </VacancySection>
            ) : (
              <VacancySectionBox
                key={section.sectionName}
                titleSection={section.title}
                colorSectionBorder={section.borderColor}
                colorSectionBG={section.backgroundColor}
              >
                {getVacanciesByStatus(
                  renderedVacancies,
                  section.sectionName
                ).map((vacancy) => (
                  <VacancyCard
                    key={vacancy.id}
                    colorSectionBG={section.backgroundTransparent}
                    colorHoverBG={section.hoverColor}
                    titleVacancy={vacancy.vacancy}
                    company={vacancy.company}
                    workType={vacancy.work_type}
                    location={vacancy.location}
                    onClick={() => alert("Модалка для редагування картки")}
                  />
                ))}
              </VacancySectionBox>
            ))
        )}
    </div>
  );
};

export default VacancyMain;

// import { FC, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../store/hook.ts";
// import {
//   Vacancy,
//   fetchVacancies,
// } from "../../../store/slices/vacanciesSlice/vacanciesSlice.ts";

// import VacancySection from "./VacancySection.tsx";
// import VacancyCard from "./VacancyCard.tsx";
// import VacancyCardFirst from "./VacancyCardFirst.tsx";
// import VacancyCardSceleton from "./VacancyCardSceleton.tsx";
// import { selectVacancies } from "../../../store/slices/vacanciesSlice/vacanciesSelector.ts";
// import { VacancyProps } from "./VacanсyHeader.tsx";
// import { sectionsConfig } from "./VacancyMain.config.ts";

// const VacancyMain: FC<VacancyProps> = ({ isArchive }) => {
//   const dispatch = useAppDispatch();
//   const { filteredVacancies, status, sortType } =
//     useAppSelector(selectVacancies);

//   //вакансії які будуть відмальовуватися на картках
//   let renderedVacancies: Vacancy[] = [];

//   //визначаємо які саме вакансії архівні чи ні потрібно відмалювати, в залежності від сторінки, пропс isArchive вказує на це
//   if (isArchive) {
//     renderedVacancies = filteredVacancies.filter((v) => v.isArchived === true);
//   } else {
//     renderedVacancies = filteredVacancies.filter((v) => v.isArchived === false);
//   }

//   // визначаємо як повинна виглядати секція в залежності від наявності сортування за статусом, чи рендеру архівної сторінки
//   const validStatuses = [
//     "saved",
//     "resume",
//     "hr",
//     "test",
//     "tech",
//     "reject",
//     "offer",
//   ];
//   const isStatus = validStatuses.includes(sortType);
//   //пропс для секцій, якщо він true то секція має виглядати без скрола и стрілок
//   const isSorting = isStatus || isArchive;
//   console.log("isSorting", isSorting);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchVacancies());
//     }
//   }, [dispatch, status]);

//   console.log("filteredVacancies", filteredVacancies);

//   //тепер використовуємо для рендеру секцій renderedVacancies замість filteredVacancies
//   const getVacanciesByStatus = (statusName: string) =>
//     renderedVacancies.filter(
//       (v) => v.statuses[v.statuses.length - 1].name === statusName
//     );

//   const savedVacancies = useMemo(
//     () => getVacanciesByStatus("saved"),
//     [filteredVacancies]
//   );
//   const resumeVacancies = useMemo(
//     () => getVacanciesByStatus("resume"),
//     [filteredVacancies]
//   );
//   const hrVacancies = useMemo(
//     () => getVacanciesByStatus("hr"),
//     [filteredVacancies]
//   );
//   const testVacancies = useMemo(
//     () => getVacanciesByStatus("test"),
//     [filteredVacancies]
//   );
//   const techVacancies = useMemo(
//     () => getVacanciesByStatus("tech"),
//     [filteredVacancies]
//   );
//   const rejectVacancies = useMemo(
//     () => getVacanciesByStatus("reject"),
//     [filteredVacancies]
//   );
//   const offerVacancies = useMemo(
//     () => getVacanciesByStatus("offer"),
//     [filteredVacancies]
//   );

//   return (
//     <div className="flex w-full flex-col gap-6">
//       {status === "loading" && (
//         <div className="flex flex-col gap-4">
//           {Array.from({ length: 3 }).map((_, index) => (
//             <VacancyCardSceleton key={index} />
//           ))}
//         </div>
//       )}
//       {status !== "loading" && filteredVacancies?.length === 0 && (
//         <VacancyCardFirst colorSectionBG="bg-color5-transparent" />
//       )}
//       {/* секція з архівними вакансіями, повинна мати вигляд такий самий, як секція при сортуванні за статусом; пропс isSorting визначає вигляд секцій, потрібно додати сірий колір в конфіг */}

//       {status !== "loading" && isArchive && renderedVacancies.length > 0 && (
//         <VacancySection
//           titleSection="Архів"
//           colorSectionBorder="[#DBDCDD]"
//           colorSectionBG="[#DBDCDD]"
//         >
//           {savedVacancies.map((vacancy) => (
//             <VacancyCard
//               key={vacancy.id}
//               colorSectionBG="[#DBDCDD]"
//               colorHoverBG="[#DBDCDD]"
//               titleVacancy={vacancy.vacancy}
//               company={vacancy.company}
//               workType={vacancy.work_type}
//               location={vacancy.location}
//               onClick={() => alert("Модалка для редагування картки")}
//             />
//           ))}
//         </VacancySection>
//       )}
//       {status !== "loading" && !isArchive && (
//         <>
//           {savedVacancies.length > 0 && (
//             <VacancySection
//               titleSection="Збережені"
//               colorSectionBorder="border-color5"
//               colorSectionBG="bg-color5"
//             >
//               {savedVacancies.map((vacancy) => (
//                 <VacancyCard
//                   key={vacancy.id}
//                   colorSectionBG="bg-color5-transparent"
//                   colorHoverBG="hover:bg-color5"
//                   titleVacancy={vacancy.vacancy}
//                   company={vacancy.company}
//                   workType={vacancy.work_type}
//                   location={vacancy.location}
//                   onClick={() => alert("Модалка для редагування картки")}
//                 />
//               ))}
//             </VacancySection>
//           )}
//           {resumeVacancies.length > 0 && (
//             <VacancySection
//               titleSection="Відправлені"
//               colorSectionBorder="border-color1"
//               colorSectionBG="bg-color1"
//             >
//               {resumeVacancies.map((vacancy) => (
//                 <VacancyCard
//                   key={vacancy.id}
//                   colorSectionBG="bg-color1-transparent"
//                   colorHoverBG="hover:bg-color1"
//                   titleVacancy={vacancy.vacancy}
//                   company={vacancy.company}
//                   workType={vacancy.work_type}
//                   location={vacancy.location}
//                   onClick={() => alert("Модалка для редагування картки")}
//                 />
//               ))}
//             </VacancySection>
//           )}
//           {hrVacancies.length > 0 && (
//             <VacancySection
//               titleSection="HR"
//               colorSectionBorder="border-color4"
//               colorSectionBG="bg-color4"
//             >
//               {hrVacancies.map((vacancy) => (
//                 <VacancyCard
//                   key={vacancy.id}
//                   colorSectionBG="bg-color4-transparent"
//                   colorHoverBG="hover:bg-color4"
//                   titleVacancy={vacancy.vacancy}
//                   company={vacancy.company}
//                   workType={vacancy.work_type}
//                   location={vacancy.location}
//                   onClick={() => alert("Модалка для редагування картки")}
//                 />
//               ))}
//             </VacancySection>
//           )}
//           {testVacancies.length > 0 && (
//             <VacancySection
//               titleSection="Тестове завдання"
//               colorSectionBorder="border-color3"
//               colorSectionBG="bg-color3"
//             >
//               {testVacancies.map((vacancy) => (
//                 <VacancyCard
//                   key={vacancy.id}
//                   colorSectionBG="bg-color3-transparent"
//                   colorHoverBG="hover:bg-color3"
//                   titleVacancy={vacancy.vacancy}
//                   company={vacancy.company}
//                   workType={vacancy.work_type}
//                   location={vacancy.location}
//                   onClick={() => alert("Модалка для редагування картки")}
//                 />
//               ))}
//             </VacancySection>
//           )}
//           {techVacancies.length > 0 && (
//             <VacancySection
//               titleSection="Технічна співбесіда"
//               colorSectionBorder="border-color6"
//               colorSectionBG="bg-color6"
//             >
//               {techVacancies.map((vacancy) => (
//                 <VacancyCard
//                   key={vacancy.id}
//                   colorSectionBG="bg-color6-transparent"
//                   colorHoverBG="hover:bg-color6"
//                   titleVacancy={vacancy.vacancy}
//                   company={vacancy.company}
//                   workType={vacancy.work_type}
//                   location={vacancy.location}
//                   onClick={() => alert("Модалка для редагування картки")}
//                 />
//               ))}
//             </VacancySection>
//           )}
//           {rejectVacancies.length > 0 && (
//             <VacancySection
//               titleSection="Відмова"
//               colorSectionBorder="border-color2"
//               colorSectionBG="bg-color2"
//             >
//               {rejectVacancies.map((vacancy) => (
//                 <VacancyCard
//                   key={vacancy.id}
//                   colorSectionBG="bg-color2-transparent"
//                   colorHoverBG="hover:bg-color2"
//                   titleVacancy={vacancy.vacancy}
//                   company={vacancy.company}
//                   workType={vacancy.work_type}
//                   location={vacancy.location}
//                   onClick={() => alert("Модалка для редагування картки")}
//                 />
//               ))}
//             </VacancySection>
//           )}
//           {offerVacancies.length > 0 && (
//             <VacancySection
//               titleSection="Оффер"
//               colorSectionBorder="border-color7"
//               colorSectionBG="bg-color7"
//             >
//               {offerVacancies.map((vacancy) => (
//                 <VacancyCard
//                   key={vacancy.id}
//                   colorSectionBG="bg-color7-transparent"
//                   colorHoverBG="hover:bg-color7"
//                   titleVacancy={vacancy.vacancy}
//                   company={vacancy.company}
//                   workType={vacancy.work_type}
//                   location={vacancy.location}
//                   onClick={() => alert("Модалка для редагування картки")}
//                 />
//               ))}
//             </VacancySection>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default VacancyMain;

// {
//   /*
//   <VacancySection
//     titleSection="Збережені"
//     colorSectionBorder="border-color5"
//     colorSectionBG="bg-color5"
//   >
//     {status === "loading" ? (
//       <p>Loading...</p>
//     ) :
//     savedVacancies.length > 0 ? (
//       savedVacancies.map((vacancy) => (
//         <VacancyCard
//           key={vacancy.id}
//           colorSectionBG="bg-color5-transparent"
//           titleVacancy={vacancy.vacancy}
//           company={vacancy.company}
//           workType={vacancy.work_type}
//           location={vacancy.location}
//         />
//       ))
//     ) : (
//       <p>Немає збережених вакансій</p>
//     )}
//   </VacancySection>
// */
// }

// {
//   /*
//   <VacancySection
//     titleSection="Відмова"
//     colorSectionBorder="border-color2"
//     colorSectionBG="bg-color2"
//   >
//     {rejectVacancies.length > 0 ? (
//       rejectVacancies.map((vacancy) => (
//         <VacancyCard
//           key={vacancy.id}
//           colorSectionBG="bg-color2-transparent"
//           titleVacancy={vacancy.vacancy}
//           company={vacancy.company}
//           workType={vacancy.work_type}
//           location={vacancy.location}
//         />
//       ))
//     ) : (
//       <p>Немає збережених вакансій</p>
//     )}
//     <VacancyCard colorSectionBG="bg-color2-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" workType="office" location="Kyiv" />
//     <VacancyCard colorSectionBG="bg-color2-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Lviv" />
//   </VacancySection>
// */
// }

// {
//   /*
//   <VacancySection
//     titleSection="Оффер"
//     colorSectionBorder="border-color7"
//     colorSectionBG="bg-color7"
//   >
//     {offerVacancies.length > 0 ? (
//       offerVacancies.map((vacancy) => (
//         <VacancyCard
//           key={vacancy.id}
//           colorSectionBG="bg-color7-transparent"
//           titleVacancy={vacancy.vacancy}
//           company={vacancy.company}
//           workType={vacancy.work_type}
//           location={vacancy.location}
//         />
//       ))
//     ) : (
//       <p>Немає збережених вакансій</p>
//     )}
//     <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" workType="office" location="Kyiv" />
//     <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" workType="office" location="kharkiv" />
//     <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Lviv" />
//     <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Kyiv" />
//     <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Kyiv" />
//     <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Poland" />
//     <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Lviv" />
//     <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Germany" />
//     <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="SENSE" workType="remote" location="Kyiv" />
//     <VacancyCard colorSectionBG="bg-color2-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" workType="office" location="Kyiv" />
//     <VacancyCard colorSectionBG="bg-color2-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Lviv" />
//   </VacancySection>
// */
// }
