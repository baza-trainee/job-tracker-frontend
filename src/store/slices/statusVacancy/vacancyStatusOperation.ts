import { statusActionProps } from "./vacancyStatusTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewStatuses } from "./vacancyStatusSlice";
import { Vacancy } from "@/types/vacancies.types";

export const fetchUpdatedStatuses = createAsyncThunk(
  "editVacancy/fetchStatuses",
  async (vacancy: Vacancy, { dispatch }) => {
    const currentStatuses = vacancy.statuses; // Збережені статуси вакансії

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

        return matchingStatuses.length === 0
          ? statusInfo
          : { ...statusInfo, ...sortedMatchingStatuses[0] };
      })
      .flat();

    console.log("Результат", prioritizedStatuses);

    dispatch(createNewStatuses(prioritizedStatuses));
  }
);

export const vacancyStatusesInfo: statusActionProps[] = [
  {
    id: "resume",
    name: "resume",
    resumeId: null,
    rejectReason: null,
    label: "addVacancy.form.resume",
    date: "1970-01-01T00:00:00.000Z",
  },
  {
    id: "hr",
    name: "hr",
    label: "addVacancy.form.hr",
    date: "1970-01-01T00:00:00.000Z",
  },
  {
    id: "test",
    name: "test",
    label: "addVacancy.form.test",
    date: "1970-01-01T00:00:00.000Z",
  },
  {
    id: "tech",
    name: "tech",
    label: "addVacancy.form.tech",
    date: "1970-01-01T00:00:00.000Z",
  },
  {
    id: "reject",
    name: "reject",
    label: "addVacancy.form.reject",
    date: "1970-01-01T00:00:00.000Z",
    rejectReason: null,
    resumeId: null,
  },
  {
    id: "offer",
    name: "offer",
    label: "addVacancy.form.offer",
    date: "1970-01-01T00:00:00.000Z",
  },
];
// ----------------------------------------------------------------------------------------

// const sortVacancyStatuses = (statuses: typeof initialState.statuses) => {
//     const predefinedOrder = ["saved", "hr", "test", "tech", "reject", "offer"];

//     // Разделяем элементы, которые есть в predefinedOrder, и остальные
//     const prioritizedStatuses = statuses.filter((status) =>
//       predefinedOrder.includes(status.name)
//     );

//     const otherStatuses = statuses.filter(
//       (status) => !predefinedOrder.includes(status.name)
//     );

//     // Сортируем элементы из predefinedOrder
//     const orderedPrioritizedStatuses = predefinedOrder
//       .map((name) =>
//         prioritizedStatuses
//           .filter((status) => status.name === name)
//           .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//       )
//       .flat();

//     // Сортируем оставшиеся элементы по дате
//     const sortedOtherStatuses = otherStatuses.sort(
//       (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//     );

//     // Объединяем массивы
//     return [...orderedPrioritizedStatuses, ...sortedOtherStatuses];
//   };

//   // Применяем функцию к массиву initialState.statuses
//   const sortedStatuses = sortVacancyStatuses(initialState.statuses);

//   console.log(sortedStatuses);
