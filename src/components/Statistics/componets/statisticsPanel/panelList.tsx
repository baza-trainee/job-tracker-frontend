import { useTranslation } from "react-i18next";

import { Vacancy } from "../../../../types/vacancies.types";

const PanelList = (vacancies: Vacancy[]) => {
  const { t } = useTranslation();

  const vacanciesForStat = vacancies.filter((v) => v.isArchived === false);

  const totalVacancies = vacanciesForStat?.length || 0;

  const totalResumes = vacanciesForStat?.reduce((count, vacancy) => {
    return (
      count +
      vacancy.statuses.filter((status) => status.name === "resume").length
    );
  }, 0);
  const totalTestTasks = vacanciesForStat?.reduce((count, vacancy) => {
    return (
      count + vacancy.statuses.filter((status) => status.name === "test").length
    );
  }, 0);
  const totalInterviews = vacanciesForStat?.reduce((count, vacancy) => {
    return (
      count +
      vacancy.statuses.filter((status) => status.name === "hr").length +
      vacancy.statuses.filter((status) => status.name === "tech").length
    );
  }, 0);

  return [
    {
      cardName: t("statisticsHeader.vacancies"),
      cardQuantity: totalVacancies,
    },
    {
      cardName: t("statisticsHeader.resumes"),
      cardQuantity: totalResumes,
    },
    {
      cardName: t("statisticsHeader.testTasks"),
      cardQuantity: totalTestTasks,
    },
    {
      cardName: t("statisticsHeader.interviews"),
      cardQuantity: totalInterviews,
    },
  ];
};

export default PanelList;
