import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useAppDispatch,
  useAppSelector,
  useFilteredVacancies,
} from "../../../store/hook.ts";
import { setFilteredVacancies } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice.ts";
import { selectfilteredVacancies } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSelector.ts";
import { useGetAllUserDataQuery } from "../../../store/querySlices/profileQuerySlice.ts";

import VacancySection from "./VacancySection.tsx";
import VacancySectionBox from "./VacancySectionBox.tsx";
import VacancyCard from "./VacancyCard.tsx";
import VacancyCardFirst from "./VacancyCardFirst.tsx";
import VacancySectionSkeleton from "./VacancySectionSceleton";

import { VacancyProps } from "./VacanсyHeader.tsx";
import {
  getLocalizedSectionConfig,
  getVacanciesByStatus,
  SectionConfig,
} from "./VacanсyMainConfig.ts";
import { openModal } from "../../../store/slices/modalSlice/modalSlice.ts";
import { fetchUpdatedStatuses } from "@/store/slices/statusVacancy/vacancyStatusOperation.ts";
import { Vacancy } from "@/types/vacancies.types.ts";

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
  useEffect(() => {
    dispatch(setFilteredVacancies(renderedVacancies));
  }, [searchQuery, sortType, dispatch]);

  //alex
  const handleVacancyCard = (
    vacancy: Vacancy,
    section?: SectionConfig
  ): void => {
    dispatch(
      openModal({
        typeModal: "editVacancy",
        idCardVacancy: vacancy.id, // delete
        borderColorModal: section?.borderColor,
        backgroundColorModal: section?.backgroundColor,
        vacancyData: vacancy,
      })
    );
    dispatch(fetchUpdatedStatuses(vacancy));
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Показ скелетону під час завантаження */}
      {isLoading && <VacancySectionSkeleton />}
      {isError && <h2>Error...</h2>}

      {/* Заглушка "картка Створіть вашу першу вакансію", якщо взагалі вакансій немає, секція "Збережені" */}
      {!isLoading && vacancies.length === 0 && (
        <VacancySection
          titleSection={t("sortDropdown.saved")}
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
              onClick={() => {
                // dispatch(openModal({ typeModal: "editVacancy" }));
                handleVacancyCard(vacancy)
              }}
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
                    onClick={() => handleVacancyCard(vacancy, section)}
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
                    onClick={() => {
                      dispatch(openModal({ typeModal: "editVacancy" }));
                    }}
                  />
                ))}
              </VacancySectionBox>
            ))
        )}
    </div>
  );
};

export default VacancyMain;

//  <VacancyCard colorSectionBG="bg-color2-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" workType="office" location="Kyiv" />
//  <VacancyCard colorSectionBG="bg-color2-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Lviv" />
//  <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" workType="office" location="Kyiv" />
//  <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior FrontEnd" company="Ajax Systems" workType="office" location="kharkiv" />
//  <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Lviv" />
//  <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Kyiv" />
//  <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="QA Engineer" company="Ajax Systems" workType="hybrid" location="Kyiv" />
//  <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Poland" />
//  <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="DUDECODE" workType="remote" location="Germany" />
//  <VacancyCard colorSectionBG="bg-color7-transparent" titleVacancy="Junior UX/Ui designer" company="SENSE" workType="remote" location="Kyiv" />
