import { statusActionProps } from "./vacancyStatusTypes";

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
//------------------------------------
// const initialState: vacancyStatusesProps = {
//     statuses: [
//       {
//         id: "saved",
//         name: "saved",
//         date: "1970-01-01T00:00:00.000Z",
//       },
//       {
//         id: "hr",
//         name: "hr",
//         date: "1970-01-01T00:00:00.000Z",
//       },
//       {
//         id: "test",
//         name: "test",
//         date: "1970-01-01T00:00:00.000Z",
//       },
//       {
//         id: "tech",
//         name: "tech",
//         date: "1970-01-01T00:00:00.000Z",
//       },
//       {
//         id: "reject",
//         name: "reject",
//         date: "1970-01-01T00:00:00.000Z",
//       },
//       {
//         id: "offer",
//         name: "offer",
//         date: "1970-01-01T00:00:00.000Z",
//       },
//       {
//         id: "tech",
//         name: "tech",
//         date: "2024-01-01T00:00:00.000Z",
//       },
//       {
//         id: "reject",
//         name: "reject",
//         date: "2024-02-01T00:00:00.000Z",
//       },
//       {
//         id: "offer",
//         name: "offer",
//         date: "2024-03-01T00:00:00.000Z",
//       },
//       {
//         id: "hr",
//         name: "hr",
//         date: "2024-04-01T00:00:00.000Z",
//       },
//       {
//         id: "test",
//         name: "test",
//         date: "2024-05-01T00:00:00.000Z",
//       },
//       {
//         id: "tech",
//         name: "tech",
//         date: "2024-06-01T00:00:00.000Z",
//       },
//     ],
//   };

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
