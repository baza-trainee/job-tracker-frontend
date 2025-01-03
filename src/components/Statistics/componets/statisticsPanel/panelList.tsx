import { useTranslation } from "react-i18next";

import { Vacancy } from "../../../../types/vacancies.types";
// import { useGetAllUserDataQuery } from "../../../../store/querySlices/profileQuerySlice";

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

  console.log("vacanciesForStat", vacanciesForStat);
  console.log("totalVacancies", totalVacancies);
  console.log("totalResumes", totalResumes);
  console.log("totalTestTasks", totalTestTasks);
  console.log("totalInterviews", totalInterviews);
  return [
    {
      cardName: t("statisticsHeader.vacancies"),
      cardQuantity: totalVacancies,
      // cardQuantity: 5,
    },
    {
      cardName: t("statisticsHeader.resumes"),
      cardQuantity: totalResumes,
      // cardQuantity: 8,
    },
    {
      cardName: t("statisticsHeader.testTasks"),
      cardQuantity: totalTestTasks,
      // cardQuantity: 49,
    },
    {
      cardName: t("statisticsHeader.interviews"),
      cardQuantity: totalInterviews,
      // cardQuantity: 6,
    },
  ];
};

export default PanelList;
