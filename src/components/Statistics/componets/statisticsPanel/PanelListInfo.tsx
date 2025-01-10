import { useTranslation } from "react-i18next";

import { StatusName, Vacancy } from "../../../../types/vacancies.types";

const PanelListInfo = (vacancies: Vacancy[]) => {
  const { t } = useTranslation();

  const totalVacancies = vacancies?.length || 0;

  // const totalResumes = vacancies?.reduce((count, vacancy) => {
  //   return (
  //     count +
  //     vacancy.statuses.filter((status) => status.name === "resume").length
  //   );
  // }, 0);

  // const totalTestTasks = vacancies?.reduce((count, vacancy) => {
  //   return (
  //     count + vacancy.statuses.filter((status) => status.name === "test").length
  //   );
  // }, 0);

  // const totalInterviews = vacancies?.reduce((count, vacancy) => {
  //   return (
  //     count +
  //     vacancy.statuses.filter((status) => status.name === "hr").length +
  //     vacancy.statuses.filter((status) => status.name === "tech").length
  //   );
  // }, 0);

  const countQuantity = (
    firstStatus: StatusName,
    secondStatus?: StatusName
  ) => {
    return vacancies?.reduce((count, vacancy) => {
      return secondStatus
        ? count +
            vacancy.statuses.filter((status) => status.name === firstStatus)
              .length +
            vacancy.statuses.filter((status) => status.name === secondStatus)
              .length
        : count +
            vacancy.statuses.filter((status) => status.name === firstStatus)
              .length;
    }, 0);
  };

  return [
    {
      cardName: t("statisticsHeader.vacancies"),
      cardQuantity: totalVacancies,
    },
    {
      cardName: t("statisticsHeader.resumes"),
      cardQuantity: countQuantity(StatusName.RESUME),
    },
    {
      cardName: t("statisticsHeader.testTasks"),
      cardQuantity: countQuantity(StatusName.TEST),
    },
    {
      cardName: t("statisticsHeader.interviews"),
      cardQuantity: countQuantity(StatusName.HR, StatusName.TECH),
    },
  ];
};

export default PanelListInfo;
