import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useMemo } from "react";
import { Vacancy } from "../types/vacancies.types";
import { Note } from "@/types/notes.types";
import { cleanStatuses } from "@/components/Vacancies/components/VacanсyMainConfig";

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

    // alex
    result = result
      .map((v) => ({
        ...v,
        statuses: cleanStatuses(v.statuses),
      }))
      .sort(
        (a, b) =>
          new Date(b.statuses[0].date).getTime() -
          new Date(a.statuses[0].date).getTime()
      );

    switch (sortType) {
      // alex
      // case "newFirst":
      //   result = result.sort(
      //     (a, b) =>
      //       new Date(b.statuses[0].date).getTime() -
      //       new Date(a.statuses[0].date).getTime()
      //   );
      //   break;

      case "oldFirst":
        result = result.sort(
          (a, b) =>
            new Date(a.statuses[0].date).getTime() -
            new Date(b.statuses[0].date).getTime()
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

export const useFilteredNotes = (
  notes: Note[],
  searchNotesQuery: string,
  sortNotesType: string
) => {
  return useMemo(() => {
    let result = [...notes];
    if (searchNotesQuery) {
      result = result.filter(
        (n) =>
          n.name.toLowerCase().includes(searchNotesQuery.toLowerCase()) ||
          n.text.toLowerCase().includes(searchNotesQuery.toLowerCase())
      );
    }

    switch (sortNotesType) {
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

      case "alphabetically":
        result = result.sort((a, b) =>
          a.name.replace(/\s+/g, "").localeCompare(b.name.replace(/\s+/g, ""))
        );
        break;

      default:
        break;
    }

    return result;
  }, [notes, searchNotesQuery, sortNotesType]);
};
