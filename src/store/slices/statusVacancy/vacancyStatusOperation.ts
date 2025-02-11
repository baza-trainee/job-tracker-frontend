import { statusActionProps } from "./vacancyStatusTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewStatuses } from "./vacancyStatusSlice";
import { Vacancy } from "@/types/vacancies.types";

export const fetchUpdatedStatuses = createAsyncThunk(
  "editVacancy/fetchStatuses",
  async (vacancy: Vacancy, { dispatch }) => {
    const currentStatuses = vacancy.statuses; // Збережені статуси вакансії
    const otherStatuses: statusActionProps[][] = []; // Статуси додаткових етапів

    const prioritizedStatuses = vacancyStatusesInfo
      .map((statusInfo) => {
        //  Знаходимо співпадаючі статуси
        const matchingStatuses = currentStatuses.filter(
          (status) => status.name === statusInfo.name
        );

        // Знайдені статуси сортуємо по даті від меншої к більшій
        const sortedMatchingStatuses = matchingStatuses.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        if (matchingStatuses.length > 1) {
          // alex
          // console.log("Фильтр", matchingStatuses);
          // console.log("Сорт", sortedMatchingStatuses);
          // console.log("Финиш", { ...statusInfo, ...sortedMatchingStatuses[0] });
          otherStatuses.push(sortedMatchingStatuses.slice(1));
        }
        return matchingStatuses.length === 0
          ? statusInfo
          : { ...statusInfo, ...sortedMatchingStatuses[0] };
      })
      .flat();

    const allVacancyStatuses: statusActionProps[] = [
      ...prioritizedStatuses,
      ...otherStatuses,
    ].flat();

    console.log("rez", allVacancyStatuses);

    dispatch(createNewStatuses(allVacancyStatuses));
  }
);

export const vacancyStatusesInfo: statusActionProps[] = [
  {
    id: "resume",
    name: "resume",
    resumeId: null,
    rejectReason: null,
    date: "1970-01-01T00:00:00.000Z",
  },
  {
    id: "hr",
    name: "hr",
    date: "1970-01-01T00:00:00.000Z",
  },
  {
    id: "test",
    name: "test",
    date: "1970-01-01T00:00:00.000Z",
  },
  {
    id: "tech",
    name: "tech",
    date: "1970-01-01T00:00:00.000Z",
  },
  {
    id: "reject",
    name: "reject",
    date: "1970-01-01T00:00:00.000Z",
    rejectReason: null,
    resumeId: null,
  },
  {
    id: "offer",
    name: "offer",
    date: "1970-01-01T00:00:00.000Z",
  },
];
