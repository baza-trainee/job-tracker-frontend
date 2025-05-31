import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useAppDispatch,
  useAppSelector,
  useFilteredVacancies,
} from "../../../store/hook.ts";
import { setFilteredVacancies } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSlice.ts";
import { selectfilteredVacancies } from "../../../store/slices/filteredVacanciesSlice/filteredVacanciesSelector.ts";
import { useGetAllUserDataQuery } from "../../../store/querySlices/profileQuerySlice.ts";
import { selectTheme } from "../../../store/slices/themeSlice/themeSelector.ts";

import VacancySection from "./VacancySection.tsx";
import VacancySectionBox from "./VacancySectionBox.tsx";
import VacancyCard from "./VacancyCard.tsx";
import VacancyCardFirst from "./VacancyCardFirst.tsx";
import VacancySectionSkeleton from "./VacancySectionSceleton";

import {
  getLocalizedSectionConfig,
  getVacanciesByStatus,
  SectionConfig,
} from "./VacanсyMainConfig.ts";
import { openModal } from "../../../store/slices/modalSlice/modalSlice.ts";
import { fetchUpdatedStatuses } from "@/store/slices/statusVacancy/vacancyStatusOperation.ts";
import { Vacancy } from "@/types/vacancies.types.ts";
import { useLocation } from "react-router-dom";

const VacancyMain: FC = () => {
  const { sortType, searchQuery } = useAppSelector(selectfilteredVacancies);
  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector(selectTheme);
  const { t } = useTranslation();
  const location = useLocation();
  const localizedSections = getLocalizedSectionConfig(darkTheme);

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

  const isArchive = location.pathname.replace(/^\/+/, "") === "archive";

  const isSorting = isStatus || isArchive;

  const renderedVacancies = isArchive
    ? filteredVacancies.filter((v) => v.isArchived === true)
    : filteredVacancies.filter((v) => v.isArchived === false);

  useEffect(() => {
    dispatch(setFilteredVacancies(renderedVacancies));
  }, [searchQuery, sortType, dispatch]);

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 575.9px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 575.9px)");

    const handleResize = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    // console.log("isMobile changed:", isMobile);
  }, [isMobile]);

  const handleVacancyCard = (
    vacancy: Vacancy,
    section?: SectionConfig
  ): void => {
    dispatch(
      openModal({
        typeModal: "editVacancy",
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
      {isError && <h2 className="text-textBlack">Error...</h2>}

      {/* Заглушка "картка Створіть вашу першу вакансію", якщо взагалі вакансій немає, секція "Збережені" */}
      {!isLoading &&
        // vacancies.length === 0 &&
        renderedVacancies.length === 0 &&
        (!isMobile ? (
          <VacancySection
            titleSection={t("sortDropdown.saved")}
            colorSectionBorder="border-color5"
            colorSectionBG="bg-color5"
          >
            <VacancyCardFirst
              colorSectionBG="bg-color5-transparent dark:bg-color5"
              colorHoverBG="hover:bg-color5 dark:hover:bg-color5-transparent"
              typeModal="addVacancy"
            />
          </VacancySection>
        ) : (
          <VacancySectionBox
            titleSection={t("sortDropdown.saved")}
            colorSectionBG="bg-color5"
            colorSectionBorder="border-color5"
          >
            <VacancyCardFirst
              colorSectionBG="bg-color5-transparent dark:bg-color5"
              colorHoverBG="hover:bg-color5 dark:hover:bg-color5-transparent"
              typeModal="addVacancy"
            />
          </VacancySectionBox>
        ))}

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
              colorSectionBG="bg-color9-transparent dark:bg-color9"
              colorHoverBG="hover:bg-color9 dark:hover:bg-color9-transparent"
              titleVacancy={vacancy.vacancy}
              company={vacancy.company}
              workType={vacancy.work_type}
              location={vacancy.location}
              onClick={() => {
                handleVacancyCard(vacancy);
              }}
            />
          ))}
        </VacancySectionBox>
      )}

      {/* В цій секції не має вакансій... - під час сортування*/}
      {!isLoading && renderedVacancies.length === 0 && (
        <p className="mt-4 font-nunito text-xl text-textBlack">
          {t("vacanciesHeader.emptySection")}
        </p>
      )}

      {/* Секції активних вакансій */}
      {!isArchive &&
        localizedSections.map(
          (section) =>
            getVacanciesByStatus(renderedVacancies, section.sectionName)
              .length > 0 &&
            (!isSorting && !isMobile ? (
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
                isSorted={isSorting}
                isArchived={isArchive}
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
              </VacancySectionBox>
            ))
        )}
    </div>
  );
};

export default VacancyMain;
