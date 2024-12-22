import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useMemo } from "react";
import { Vacancy } from "./slices/vacanciesSlice/vacanciesSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFilteredVacancies = (
  vacancies: Vacancy[],
  searchQuery: string,
  sortType: string
) => {
  return useMemo(() => {
    let result = [...vacancies];
    if (searchQuery) {
      result = result.filter(
        (v) =>
          v.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.vacancy.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortType) {
      case "newFirst":
        result = result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;

      case "oldFirst":
        result = result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;

      case "office":
      case "remote":
      case "hybrid":
        result = result.filter((v) => v.work_type === sortType);
        break;

      case "saved":
      case "resume":
      case "hr":
      case "test":
      case "tech":
      case "reject":
      case "offer":
        result = result.filter((v) => v.statuses[0].name === sortType);
        break;

      default:
        break;
    }

    return result;
  }, [vacancies, searchQuery, sortType]);
};
