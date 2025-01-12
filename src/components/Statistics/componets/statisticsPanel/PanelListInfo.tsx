import { StatusName, Vacancy } from "../../../../types/vacancies.types";
import { CardNameKeys } from "./statPanel.types";

const PanelListInfo = (vacancies: Vacancy[]) => {
  let totalResumes = 0;
  let totalTestTasks = 0;
  let totalInterviews = 0;

  vacancies.forEach((vacancy) => {
    vacancy.statuses.forEach((status) => {
      if (status.name === StatusName.RESUME) {
        totalResumes++;
      } else if (status.name === StatusName.TEST) {
        totalTestTasks++;
      } else if (
        status.name === StatusName.HR ||
        status.name === StatusName.TECH
      ) {
        totalInterviews++;
      }
    });
  });

  return [
    {
      cardName: CardNameKeys.VACANCIES,
      cardQuantity: vacancies.length,
    },
    {
      cardName: CardNameKeys.RESUME,
      cardQuantity: totalResumes,
    },
    {
      cardName: CardNameKeys.TESTTASKS,
      cardQuantity: totalTestTasks,
    },
    {
      cardName: CardNameKeys.INTERVIEWS,
      cardQuantity: totalInterviews,
    },
  ];
};

export default PanelListInfo;
